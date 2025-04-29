// src/app/api/admin/uploads/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma/client';
import { PropertyStatus } from '@/generated/prisma';
// Import necessary libraries for file handling and cloud storage (e.g., AWS SDK)
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

// Configure your cloud storage (e.g., S3)
// const s3Client = new S3Client({ region: "your-region" });
// const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'your-bucket-name';

// Helper function to verify admin (similar to settings API)
const verifyAdmin = async (request: Request): Promise<{ isAdmin: boolean; userId?: string }> => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { isAdmin: false };
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    // Add actual admin role check here (e.g., check user role in DB)
    // const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    // if (!user || user.role !== 'ADMIN') return { isAdmin: false };
    return { isAdmin: true, userId: decoded.userId }; // Assuming admin for now
  } catch (error) {
    return { isAdmin: false };
  }
};

// POST /api/admin/uploads - Handle file uploads
export async function POST(request: Request) {
  try {
    // Verify admin access
    const { isAdmin } = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const uploadType = formData.get('type') as string | null; // e.g., 'logo', 'tutorialVideo', 'propertyImage', 'contractDocument', 'serviceRequestDocument'
    const relatedId = formData.get('relatedId') as string | null; // e.g., propertyId, contractId

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }
    if (!uploadType) {
      return NextResponse.json({ error: 'Tipo de upload não especificado' }, { status: 400 });
    }

    // --- Placeholder for Cloud Storage Upload Logic --- 
    // In a real application, you would upload the file to S3 or similar here
    // and get the actual URL.
    const uniqueFilename = `${uploadType}/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const fileUrl = `https://storage.googleapis.com/your-bucket-name/${uniqueFilename}`; // Example placeholder URL
    console.log(`Simulating upload for ${file.name} to ${fileUrl}`);
    // --- End Placeholder ---

    // Update database based on upload type
    try {
      if (uploadType === 'logo') {
        await prisma.adminSetting.upsert({
          where: { settingKey_cityId: { settingKey: 'logo_url', cityId: null } }, // Global setting
          update: { settingValue: fileUrl },
          create: { settingKey: 'logo_url', settingValue: fileUrl },
        });
      } else if (uploadType === 'tutorialVideo') {
        await prisma.adminSetting.upsert({
          where: { settingKey_cityId: { settingKey: 'tutorial_video_url', cityId: null } }, // Global setting
          update: { settingValue: fileUrl },
          create: { settingKey: 'tutorial_video_url', settingValue: fileUrl },
        });
      } else if (uploadType === 'propertyImage' && relatedId) {
        // Find current max order for the property
        const maxOrderResult = await prisma.propertyImage.aggregate({
          _max: { order: true },
          where: { propertyId: relatedId },
        });
        const nextOrder = (maxOrderResult._max.order ?? -1) + 1;
        
        await prisma.propertyImage.create({
          data: {
            url: fileUrl,
            order: nextOrder,
            propertyId: relatedId,
          },
        });
      } else if (uploadType === 'contractDocument' && relatedId) {
        // Update the contract record with the signed PDF URL
        await prisma.contract.update({
          where: { id: relatedId },
          data: { pdfUrl: fileUrl, status: 'ASSINADO' }, // Update status as well
        });
      } else if (uploadType === 'serviceRequestDocument') {
        // This might just be attached to an email, or stored temporarily
        // For now, we just return the URL, assuming it's handled by the service logic
        console.log(`Service request document uploaded: ${fileUrl}`);
      }
      // Add more types as needed

    } catch (dbError) {
        console.error('Database update failed after upload:', dbError);
        // Consider deleting the uploaded file from storage if DB update fails
        return NextResponse.json({ error: 'Falha ao atualizar banco de dados após upload' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Upload bem-sucedido!', url: fileUrl });

  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json({ error: 'Falha no upload do arquivo' }, { status: 500 });
  }
}

