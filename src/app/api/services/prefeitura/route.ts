// src/app/api/services/prefeitura/route.ts
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

// POST /api/services/prefeitura - Enviar solicitação para prefeitura
export async function POST(request: Request) {
  try {
    // Verificar autenticação (opcional)
    const { isAuth, userId } = await verifyAuth(request);

    const body = await request.json();
    const {
      name, // Nome do solicitante
      email, // Email do solicitante
      cityId, // ID da cidade para buscar email da prefeitura
      serviceType, // Tipo de serviço solicitado
      requestFileUrl, // URL do arquivo com a solicitação (texto) enviado via upload API
      paymentConfirmation, // Link ou ID de confirmação do pagamento da taxa
    } = body;

    // Validação básica
    if (!name || !email || !cityId || !serviceType || !requestFileUrl || !paymentConfirmation) {
      return NextResponse.json({ error: 'Dados incompletos para envio à prefeitura' }, { status: 400 });
    }

    // Buscar cidade para obter email da prefeitura
    const city = await prisma.city.findUnique({
      where: { id: cityId },
    });

    if (!city || !city.prefeituraEmail) {
      return NextResponse.json({ error: 'Email da prefeitura não configurado para esta cidade' }, { status: 404 });
    }

    const destinationEmail = city.prefeituraEmail;

    // Preparar conteúdo do email
    const emailSubject = `Nova Solicitação de Serviço - ${serviceType} - ${name}`;
    const emailText = `
      Nova solicitação de serviço para a prefeitura:
      
      Nome do Solicitante: ${name}
      Email do Solicitante: ${email}
      Cidade: ${city.name} - ${city.state}
      Tipo de Serviço: ${serviceType}
      Link do Arquivo de Solicitação: ${requestFileUrl}
      
      Confirmação de Pagamento da Taxa: ${paymentConfirmation}
      
      Por favor, processe a solicitação.
    `;

    const emailHtml = `
      <h2>Nova solicitação de serviço para a prefeitura</h2>
      
      <p><strong>Nome do Solicitante:</strong> ${name}</p>
      <p><strong>Email do Solicitante:</strong> ${email}</p>
      <p><strong>Cidade:</strong> ${city.name} - ${city.state}</p>
      <p><strong>Tipo de Serviço:</strong> ${serviceType}</p>
      <p><strong>Link do Arquivo de Solicitação:</strong> <a href="${requestFileUrl}">${requestFileUrl}</a></p>
      
      <p><strong>Confirmação de Pagamento da Taxa:</strong> ${paymentConfirmation}</p>
      
      <p>Por favor, processe a solicitação.</p>
    `;

    // Enviar email para a prefeitura
    const emailResult = await sendEmail({
      to: destinationEmail,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      // Optionally attach the file if needed
    });

    if (!emailResult.success) {
      console.error('Falha ao enviar email para a prefeitura:', emailResult.error);
      return NextResponse.json({ error: 'Falha ao enviar solicitação para a prefeitura' }, { status: 500 });
    }

    // Enviar confirmação para o cliente
    await sendEmail({
      to: email,
      subject: `Solicitação de Serviço (${serviceType}) Enviada - Glória Imóveis`,
      text: `
        Olá ${name},
        
        Sua solicitação de serviço (${serviceType}) foi enviada com sucesso para a prefeitura de ${city.name}.
        
        A prefeitura processará sua solicitação e poderá entrar em contato diretamente ou responder via email.
        
        Obrigado por utilizar os serviços da Glória Imóveis!
      `,
      html: `
        <h2>Solicitação de Serviço Enviada</h2>
        
        <p>Olá ${name},</p>
        
        <p>Sua solicitação de serviço (<strong>${serviceType}</strong>) foi enviada com sucesso para a prefeitura de ${city.name}.</p>
        
        <p>A prefeitura processará sua solicitação e poderá entrar em contato diretamente ou responder via email.</p>
        
        <p>Obrigado por utilizar os serviços da Glória Imóveis!</p>
      `,
    });

    return NextResponse.json({ message: 'Solicitação para prefeitura enviada com sucesso' });
  } catch (error) {
    console.error('Erro ao processar solicitação para prefeitura:', error);
    return NextResponse.json({ error: 'Falha ao processar solicitação para prefeitura' }, { status: 500 });
  }
}
