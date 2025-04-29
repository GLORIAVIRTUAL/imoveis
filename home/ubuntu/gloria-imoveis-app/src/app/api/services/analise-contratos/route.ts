// src/app/api/services/analise-contratos/route.ts
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

// POST /api/services/analise-contratos - Solicitar análise de contrato
export async function POST(request: Request) {
  try {
    // Verificar autenticação (opcional)
    const { isAuth, userId } = await verifyAuth(request);

    const body = await request.json();
    const {
      name, // Nome do solicitante
      email, // Email do solicitante
      contractFileUrl, // URL do contrato enviado via upload API
      paymentConfirmation, // Link ou ID de confirmação do pagamento
    } = body;

    // Validação básica
    if (!name || !email || !contractFileUrl || !paymentConfirmation) {
      return NextResponse.json({ error: 'Dados incompletos para análise de contrato' }, { status: 400 });
    }

    // Buscar configuração de email para análise de contratos (global)
    const emailSetting = await prisma.adminSetting.findFirst({
      where: {
        settingKey: 'analise_contratos_email',
        cityId: null, // Assuming global setting
      },
    });

    // Email de destino (do setting ou padrão)
    const destinationEmail = emailSetting?.settingValue || 'analisecontratos@gloriaimoveis.com';

    // Preparar conteúdo do email
    const emailSubject = `Nova Solicitação de Análise de Contrato`;
    const emailText = `
      Nova solicitação de análise de contrato:
      
      Nome do Solicitante: ${name}
      Email do Solicitante: ${email}
      Link do Contrato: ${contractFileUrl}
      
      Confirmação de Pagamento: ${paymentConfirmation}
      
      Por favor, realize a análise e envie o resultado para o email do solicitante (${email}).
    `;

    const emailHtml = `
      <h2>Nova solicitação de análise de contrato</h2>
      
      <p><strong>Nome do Solicitante:</strong> ${name}</p>
      <p><strong>Email do Solicitante:</strong> ${email}</p>
      <p><strong>Link do Contrato:</strong> <a href="${contractFileUrl}">${contractFileUrl}</a></p>
      
      <p><strong>Confirmação de Pagamento:</strong> ${paymentConfirmation}</p>
      
      <p>Por favor, realize a análise e envie o resultado para o email do solicitante (${email}).</p>
    `;

    // Enviar email para o setor responsável
    const emailResult = await sendEmail({
      to: destinationEmail,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    if (!emailResult.success) {
      console.error('Falha ao enviar email de análise de contrato:', emailResult.error);
      return NextResponse.json({ error: 'Falha ao enviar solicitação de análise de contrato' }, { status: 500 });
    }

    // Enviar confirmação para o cliente
    await sendEmail({
      to: email,
      subject: 'Solicitação de Análise de Contrato Recebida - Glória Imóveis',
      text: `
        Olá ${name},
        
        Sua solicitação de análise para o contrato (${contractFileUrl}) foi recebida com sucesso.
        
        O resultado será enviado para o seu email (${email}) assim que a análise for concluída.
        
        Obrigado por escolher a Glória Imóveis!
      `,
      html: `
        <h2>Solicitação de Análise de Contrato Recebida</h2>
        
        <p>Olá ${name},</p>
        
        <p>Sua solicitação de análise para o contrato (<a href="${contractFileUrl}">link</a>) foi recebida com sucesso.</p>
        
        <p>O resultado será enviado para o seu email (${email}) assim que a análise for concluída.</p>
        
        <p>Obrigado por escolher a Glória Imóveis!</p>
      `,
    });

    return NextResponse.json({ message: 'Solicitação de análise de contrato enviada com sucesso' });
  } catch (error) {
    console.error('Erro ao processar solicitação de análise de contrato:', error);
    return NextResponse.json({ error: 'Falha ao processar solicitação de análise de contrato' }, { status: 500 });
  }
}
