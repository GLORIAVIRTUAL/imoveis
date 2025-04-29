// src/app/api/payments/callback/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { PropertyStatus } from '@/generated/prisma';
import { sendEmail } from '@/lib/email';

// POST /api/payments/callback - Receber confirmação de pagamento (webhook)
export async function POST(request: Request) {
  try {
    // Verificar se a requisição tem um token de segurança válido
    // Isso é importante para garantir que apenas o provedor de pagamento possa chamar este endpoint
    const authHeader = request.headers.get('Authorization');
    const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET || 'your-webhook-secret';
    
    if (!authHeader || authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const {
      paymentId, // ID do pagamento no provedor
      status, // Status do pagamento: 'approved', 'rejected', 'pending', etc.
      serviceType, // Tipo de serviço: 'property_sale', 'property_rent', 'evaluation', etc.
      propertyId, // ID do imóvel (opcional)
      amount, // Valor pago
      metadata, // Metadados adicionais
    } = body;

    // Validação básica
    if (!paymentId || !status || !serviceType) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    // Processar pagamento com base no tipo de serviço e status
    if (status === 'approved' || status === 'completed' || status === 'success') {
      // Pagamento aprovado, atualizar status conforme o tipo de serviço
      
      if ((serviceType === 'property_sale' || serviceType === 'property_rent') && propertyId) {
        // Atualizar status do imóvel para ATIVO após pagamento do depósito
        await prisma.property.update({
          where: { id: propertyId },
          data: {
            status: PropertyStatus.ATIVO,
            depositPaid: true,
          },
        });
        
        // Buscar detalhes do imóvel e do proprietário para enviar email
        const property = await prisma.property.findUnique({
          where: { id: propertyId },
          include: {
            user: true, // Proprietário
            city: true,
          },
        });
        
        if (property && property.user) {
          // Enviar email de confirmação para o proprietário
          await sendEmail({
            to: property.user.email,
            subject: 'Pagamento Confirmado - Seu Imóvel Está Ativo!',
            text: `
              Olá ${property.user.name},
              
              O pagamento do depósito para seu imóvel "${property.title}" foi confirmado!
              
              Seu imóvel agora está ativo e visível para potenciais compradores/locatários.
              
              Obrigado por escolher a Glória Imóveis!
            `,
            html: `
              <h2>Pagamento Confirmado - Seu Imóvel Está Ativo!</h2>
              
              <p>Olá ${property.user.name},</p>
              
              <p>O pagamento do depósito para seu imóvel "<strong>${property.title}</strong>" foi confirmado!</p>
              
              <p>Seu imóvel agora está ativo e visível para potenciais compradores/locatários.</p>
              
              <p>Obrigado por escolher a Glória Imóveis!</p>
            `,
          });
        }
      }
      
      // Outros tipos de serviço podem ser processados aqui
      // Por exemplo, enviar emails de confirmação para avaliação, consulta CPF, etc.
      
      // Registrar o pagamento no banco de dados (opcional)
      // await prisma.payment.create({ ... });
      
      return NextResponse.json({ message: 'Pagamento processado com sucesso' });
    } else if (status === 'rejected' || status === 'failed') {
      // Pagamento rejeitado, atualizar status conforme necessário
      
      // Registrar a falha no banco de dados (opcional)
      // await prisma.paymentFailure.create({ ... });
      
      return NextResponse.json({ message: 'Falha de pagamento registrada' });
    } else {
      // Status pendente ou outro
      return NextResponse.json({ message: 'Status de pagamento registrado' });
    }
  } catch (error) {
    console.error('Erro ao processar callback de pagamento:', error);
    return NextResponse.json({ error: 'Falha ao processar callback de pagamento' }, { status: 500 });
  }
}
