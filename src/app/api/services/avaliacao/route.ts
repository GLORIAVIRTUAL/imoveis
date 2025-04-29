// src/app/api/services/avaliacao/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { sendEmail } from '@/lib/email';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

// Helper function to verify authentication
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

// POST /api/services/avaliacao - Solicitar avaliação de imóvel
export async function POST(request: Request) {
  try {
    // Verificar autenticação (opcional, dependendo do requisito)
    const { isAuth, userId } = await verifyAuth(request);
    
    const body = await request.json();
    const {
      name,
      email,
      phone,
      address,
      neighborhood,
      cityId,
      propertyType, // casa, apartamento, terreno, etc.
      propertySize,
      bedrooms,
      bathrooms,
      additionalInfo,
      paymentConfirmation, // Link ou ID de confirmação do pagamento
    } = body;

    // Validação básica
    if (!name || !email || !phone || !address || !neighborhood || !cityId || !propertyType) {
      return NextResponse.json({ error: 'Dados incompletos para avaliação' }, { status: 400 });
    }

    // Buscar cidade para obter email de destino
    const city = await prisma.city.findUnique({
      where: { id: cityId },
    });

    if (!city) {
      return NextResponse.json({ error: 'Cidade não encontrada' }, { status: 404 });
    }

    // Buscar configuração de email para avaliação (pode ser específico por cidade ou global)
    const emailSetting = await prisma.adminSetting.findFirst({
      where: {
        OR: [
          { settingKey: 'avaliacao_email', cityId: city.id },
          { settingKey: 'avaliacao_email', cityId: null },
        ],
      },
      orderBy: {
        cityId: 'desc', // Prioriza configuração específica da cidade
      },
    });

    // Email de destino (do setting ou padrão)
    const destinationEmail = emailSetting?.settingValue || 'avaliacao@gloriaimoveis.com';

    // Preparar conteúdo do email
    const emailSubject = `Nova Solicitação de Avaliação de Imóvel - ${city.name}`;
    const emailText = `
      Nova solicitação de avaliação de imóvel:
      
      Nome: ${name}
      Email: ${email}
      Telefone: ${phone}
      Endereço: ${address}
      Bairro: ${neighborhood}
      Cidade: ${city.name} - ${city.state}
      Tipo de Imóvel: ${propertyType}
      Tamanho: ${propertySize || 'Não informado'}
      Quartos: ${bedrooms || 'Não informado'}
      Banheiros: ${bathrooms || 'Não informado'}
      Informações Adicionais: ${additionalInfo || 'Nenhuma'}
      
      Confirmação de Pagamento: ${paymentConfirmation || 'Não informado'}
      
      Por favor, entre em contato com o cliente para agendar a avaliação.
    `;

    const emailHtml = `
      <h2>Nova solicitação de avaliação de imóvel</h2>
      
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${phone}</p>
      <p><strong>Endereço:</strong> ${address}</p>
      <p><strong>Bairro:</strong> ${neighborhood}</p>
      <p><strong>Cidade:</strong> ${city.name} - ${city.state}</p>
      <p><strong>Tipo de Imóvel:</strong> ${propertyType}</p>
      <p><strong>Tamanho:</strong> ${propertySize || 'Não informado'}</p>
      <p><strong>Quartos:</strong> ${bedrooms || 'Não informado'}</p>
      <p><strong>Banheiros:</strong> ${bathrooms || 'Não informado'}</p>
      <p><strong>Informações Adicionais:</strong> ${additionalInfo || 'Nenhuma'}</p>
      
      <p><strong>Confirmação de Pagamento:</strong> ${paymentConfirmation || 'Não informado'}</p>
      
      <p>Por favor, entre em contato com o cliente para agendar a avaliação.</p>
    `;

    // Enviar email
    const emailResult = await sendEmail({
      to: destinationEmail,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    if (!emailResult.success) {
      console.error('Falha ao enviar email de avaliação:', emailResult.error);
      return NextResponse.json({ error: 'Falha ao enviar solicitação de avaliação' }, { status: 500 });
    }

    // Enviar confirmação para o cliente
    await sendEmail({
      to: email,
      subject: 'Solicitação de Avaliação Recebida - Glória Imóveis',
      text: `
        Olá ${name},
        
        Sua solicitação de avaliação de imóvel foi recebida com sucesso.
        
        Um de nossos avaliadores entrará em contato em breve para agendar a visita.
        
        Obrigado por escolher a Glória Imóveis!
      `,
      html: `
        <h2>Solicitação de Avaliação Recebida</h2>
        
        <p>Olá ${name},</p>
        
        <p>Sua solicitação de avaliação de imóvel foi recebida com sucesso.</p>
        
        <p>Um de nossos avaliadores entrará em contato em breve para agendar a visita.</p>
        
        <p>Obrigado por escolher a Glória Imóveis!</p>
      `,
    });

    return NextResponse.json({ message: 'Solicitação de avaliação enviada com sucesso' });
  } catch (error) {
    console.error('Erro ao processar solicitação de avaliação:', error);
    return NextResponse.json({ error: 'Falha ao processar solicitação de avaliação' }, { status: 500 });
  }
}
