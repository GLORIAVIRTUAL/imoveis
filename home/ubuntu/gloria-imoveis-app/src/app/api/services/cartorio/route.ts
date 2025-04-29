// src/app/api/services/cartorio/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { sendEmail } from '@/lib/email';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

// Helper function to verify authentication (optional)
const verifyAuth = async (request: Request): Promise<{ isAuth: boolean; userId?: string }> => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { isAuth: false };
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return { isAuth: true, userId: decoded.userId };
  } catch (error) {
    return { isAuth: false };
  }
};

// POST /api/services/cartorio - Enviar contrato assinado para cartório
export async function POST(request: Request) {
  try {
    // Verificar autenticação (opcional)
    const { isAuth, userId } = await verifyAuth(request);

    const body = await request.json();
    const {
      name, // Nome do solicitante
      email, // Email do solicitante
      cityId, // ID da cidade para buscar email do cartório
      signedContractFileUrl, // URL do contrato assinado (PDF) enviado via upload API
      paymentConfirmation, // Link ou ID de confirmação do pagamento da taxa
    } = body;

    // Validação básica
    if (!name || !email || !cityId || !signedContractFileUrl || !paymentConfirmation) {
      return NextResponse.json({ error: 'Dados incompletos para envio ao cartório' }, { status: 400 });
    }

    // Buscar cidade para obter email do cartório
    const city = await prisma.city.findUnique({
      where: { id: cityId },
    });

    if (!city || !city.cartorioEmail) {
      return NextResponse.json({ error: 'Email do cartório não configurado para esta cidade' }, { status: 404 });
    }

    const destinationEmail = city.cartorioEmail;

    // Preparar conteúdo do email
    const emailSubject = `Registro de Contrato - ${name}`;
    const emailText = `
      Solicitação de registro de contrato:
      
      Nome do Solicitante: ${name}
      Email do Solicitante: ${email}
      Cidade: ${city.name} - ${city.state}
      Link do Contrato Assinado: ${signedContractFileUrl}
      
      Confirmação de Pagamento da Taxa: ${paymentConfirmation}
      
      Por favor, processe o registro e envie a confirmação/documento para o email do solicitante (${email}).
    `;

    const emailHtml = `
      <h2>Solicitação de registro de contrato</h2>
      
      <p><strong>Nome do Solicitante:</strong> ${name}</p>
      <p><strong>Email do Solicitante:</strong> ${email}</p>
      <p><strong>Cidade:</strong> ${city.name} - ${city.state}</p>
      <p><strong>Link do Contrato Assinado:</strong> <a href="${signedContractFileUrl}">${signedContractFileUrl}</a></p>
      
      <p><strong>Confirmação de Pagamento da Taxa:</strong> ${paymentConfirmation}</p>
      
      <p>Por favor, processe o registro e envie a confirmação/documento para o email do solicitante (${email}).</p>
    `;

    // Enviar email para o cartório
    const emailResult = await sendEmail({
      to: destinationEmail,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      // Optionally attach the PDF if needed, though link is usually sufficient
    });

    if (!emailResult.success) {
      console.error('Falha ao enviar email para o cartório:', emailResult.error);
      return NextResponse.json({ error: 'Falha ao enviar solicitação para o cartório' }, { status: 500 });
    }

    // Enviar confirmação para o cliente
    await sendEmail({
      to: email,
      subject: 'Contrato Enviado para Registro - Glória Imóveis',
      text: `
        Olá ${name},
        
        Seu contrato assinado (${signedContractFileUrl}) foi enviado com sucesso para o cartório de ${city.name} para registro.
        
        O cartório enviará a confirmação ou o documento registrado diretamente para o seu email (${email}) assim que o processo for concluído.
        
        Obrigado por escolher a Glória Imóveis!
      `,
      html: `
        <h2>Contrato Enviado para Registro</h2>
        
        <p>Olá ${name},</p>
        
        <p>Seu contrato assinado (<a href="${signedContractFileUrl}">link</a>) foi enviado com sucesso para o cartório de ${city.name} para registro.</p>
        
        <p>O cartório enviará a confirmação ou o documento registrado diretamente para o seu email (${email}) assim que o processo for concluído.</p>
        
        <p>Obrigado por escolher a Glória Imóveis!</p>
      `,
    });

    return NextResponse.json({ message: 'Solicitação para cartório enviada com sucesso' });
  } catch (error) {
    console.error('Erro ao processar solicitação para cartório:', error);
    return NextResponse.json({ error: 'Falha ao processar solicitação para cartório' }, { status: 500 });
  }
}
