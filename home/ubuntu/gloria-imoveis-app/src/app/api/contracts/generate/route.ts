// src/app/api/contracts/generate/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import jwt from 'jsonwebtoken';
import { ContractType, ContractStatus, MaritalStatus } from '@/generated/prisma';
import { exec } from 'child_process';
import util from 'util';
import fs from 'fs/promises'; // To read the generated PDF for upload

// Promisify exec for easier async/await usage
const execPromise = util.promisify(exec);

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';
const PYTHON_EXECUTABLE = '/home/ubuntu/weasyprint_env/bin/python3';
const GENERATOR_SCRIPT = '/home/ubuntu/gloria-imoveis-app/scripts/contract_generator.py';
const UPLOAD_API_ENDPOINT = '/api/admin/uploads'; // Assuming this endpoint handles uploads

// Helper function to verify authentication
const verifyAuth = async (request: Request): Promise<{ isAuth: boolean; userId?: string; token?: string }> => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { isAuth: false };
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return { isAuth: true, userId: decoded.userId, token };
  } catch (error) {
    return { isAuth: false };
  }
};

// Function to call the upload API
async function uploadFile(filePath: string, fileName: string, uploadType: string, relatedId: string, authToken: string): Promise<string | null> {
    try {
        const fileBuffer = await fs.readFile(filePath);
        const formData = new FormData();
        formData.append('file', new Blob([fileBuffer]), fileName);
        formData.append('type', uploadType);
        formData.append('relatedId', relatedId);

        // Assuming the API runs on the same host/port or you have the full URL
        const uploadResponse = await fetch(new URL(UPLOAD_API_ENDPOINT, process.env.NEXTAUTH_URL || 'http://localhost:3000').toString(), {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: formData,
        });

        if (!uploadResponse.ok) {
            console.error('Upload API call failed:', await uploadResponse.text());
            return null;
        }

        const result = await uploadResponse.json();
        return result.url; // Assuming the upload API returns the URL
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
}

export async function POST(request: Request) {
  let contractId: string | null = null;
  let generatedPdfPath: string | null = null;

  try {
    // Verify authentication
    const { isAuth, userId: buyerId, token } = await verifyAuth(request);
    if (!isAuth || !buyerId || !token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const {
      propertyId,
      buyerName, // Allow overrides/completion
      buyerCpf,
      buyerRg,
      buyerDob,
      buyerMaritalStatus,
      paymentMethod,
    } = body;

    // Validation
    if (!propertyId || !buyerName || !buyerCpf || !buyerRg || !buyerDob || !buyerMaritalStatus) {
      return NextResponse.json({ error: 'Dados do imóvel e do comprador são obrigatórios' }, { status: 400 });
    }

    // Fetch data
    const property = await prisma.property.findUnique({ where: { id: propertyId }, include: { user: true, city: true } });
    const buyer = await prisma.user.findUnique({ where: { id: buyerId } });

    if (!property || !buyer) {
      return NextResponse.json({ error: 'Imóvel ou Comprador não encontrado' }, { status: 404 });
    }

    // Update buyer profile if necessary
    const updateData: any = {};
    if (!buyer.rg && buyerRg) updateData.rg = buyerRg;
    if (!buyer.maritalStatus && buyerMaritalStatus && Object.values(MaritalStatus).includes(buyerMaritalStatus as MaritalStatus)) {
        updateData.maritalStatus = buyerMaritalStatus as MaritalStatus;
    }
    if (Object.keys(updateData).length > 0) {
        await prisma.user.update({ where: { id: buyerId }, data: updateData });
        // Re-fetch buyer if needed, or merge data
        Object.assign(buyer, updateData);
    }

    const contractType = property.type === 'VENDA' ? ContractType.COMPRA : ContractType.ALUGUEL;

    // Create contract record
    const newContract = await prisma.contract.create({
      data: {
        type: contractType,
        price: property.price,
        paymentMethod: contractType === ContractType.COMPRA ? paymentMethod : null,
        status: ContractStatus.GERADO,
        propertyId: property.id,
        buyerId: buyer.id,
        sellerId: property.userId,
      },
      include: {
        property: { include: { city: true } },
        buyer: true,
        seller: true,
      }
    });
    contractId = newContract.id; // Store for potential cleanup

    // Prepare data for Python script
    const contractDataForPython = JSON.stringify(newContract);

    // Execute Python script to generate PDF
    const command = `${PYTHON_EXECUTABLE} ${GENERATOR_SCRIPT} '${contractDataForPython.replace(/'/g, `'\''`)}'`; // Escape single quotes in JSON
    console.log('Executing command:', command);
    const { stdout, stderr } = await execPromise(command);

    console.log('Python script stdout:', stdout);
    if (stderr) {
      console.error('Python script stderr:', stderr);
      // Don't throw immediately, check stdout for success message
    }

    // Parse Python script output to get the file path
    let pythonResult;
    try {
        // Find the JSON output line
        const jsonOutputLine = stdout.split('\n').find(line => line.trim().startsWith('{'));
        if (!jsonOutputLine) throw new Error('JSON output not found in script stdout');
        pythonResult = JSON.parse(jsonOutputLine);
    } catch (parseError) {
        console.error('Error parsing Python script output:', parseError, stdout);
        throw new Error('Falha ao gerar PDF: Erro no script Python.');
    }

    if (!pythonResult.success || !pythonResult.file_path) {
      console.error('PDF generation script failed:', pythonResult.error || 'Unknown error');
      throw new Error(`Falha ao gerar PDF: ${pythonResult.error || 'Erro desconhecido no script'}`);
    }

    generatedPdfPath = pythonResult.file_path;
    const pdfFileName = generatedPdfPath.split('/').pop() || `contrato_${contractId}.pdf`;

    // Upload the generated PDF using the upload API
    const uploadedPdfUrl = await uploadFile(generatedPdfPath, pdfFileName, 'contractDocument', contractId, token);

    if (!uploadedPdfUrl) {
        throw new Error('Falha ao fazer upload do PDF do contrato.');
    }

    // Update contract record with the PDF URL from storage
    const updatedContract = await prisma.contract.update({
      where: { id: contractId },
      data: { pdfUrl: uploadedPdfUrl },
      include: {
        property: { include: { city: true } },
        buyer: true,
        seller: true,
      }
    });

    // Clean up the locally generated PDF file
    await fs.unlink(generatedPdfPath);
    generatedPdfPath = null; // Mark as deleted

    return NextResponse.json({ message: 'Contrato gerado e salvo com sucesso!', contract: updatedContract }, { status: 201 });

  } catch (error: any) {
    console.error('Error generating contract:', error);
    // Attempt to clean up generated PDF if it exists and an error occurred
    if (generatedPdfPath) {
        try { await fs.unlink(generatedPdfPath); } catch (cleanupError) { console.error('Error cleaning up PDF:', cleanupError); }
    }
    // Optionally delete the contract record if PDF generation/upload failed
    // if (contractId) { try { await prisma.contract.delete({ where: { id: contractId } }); } catch (deleteError) { console.error('Error deleting contract record after failure:', deleteError); } }
    return NextResponse.json({ error: `Falha ao gerar contrato: ${error.message}` }, { status: 500 });
  }
}

