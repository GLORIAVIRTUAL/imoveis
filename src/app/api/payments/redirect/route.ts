// src/app/api/payments/redirect/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

// POST /api/payments/redirect - Obter URL de redirecionamento para pagamento
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      serviceType, // Tipo de serviço: 'property_sale', 'property_rent', 'evaluation', 'cpf_check', 'contract_analysis', 'notary', 'city_hall'
      cityId, // ID da cidade (opcional, para serviços específicos por cidade)
      propertyId, // ID do imóvel (opcional, para pagamentos relacionados a imóveis)
      amount, // Valor (opcional, para alguns serviços)
    } = body;

    // Validação básica
    if (!serviceType) {
      return NextResponse.json({ error: 'Tipo de serviço é obrigatório' }, { status: 400 });
    }

    // Construir a chave de configuração com base no tipo de serviço
    let settingKey = `payment_link_${serviceType}`;
    
    // Buscar configuração de link de pagamento (específica por cidade ou global)
    const paymentLinkSetting = await prisma.adminSetting.findFirst({
      where: {
        OR: [
          { settingKey, cityId: cityId || null },
          { settingKey, cityId: null },
        ],
      },
      orderBy: {
        cityId: 'desc', // Prioriza configuração específica da cidade
      },
      include: {
        city: true, // Incluir detalhes da cidade, se aplicável
      }
    });

    if (!paymentLinkSetting) {
      return NextResponse.json({ error: 'Link de pagamento não configurado para este serviço' }, { status: 404 });
    }

    // URL base do link de pagamento
    let paymentUrl = paymentLinkSetting.settingValue;

    // Adicionar parâmetros à URL conforme necessário
    const urlParams = new URLSearchParams();
    
    // Adicionar parâmetros comuns
    if (amount) {
      urlParams.append('amount', amount.toString());
    }
    
    // Adicionar referência ao serviço
    urlParams.append('service', serviceType);
    
    // Adicionar referência à cidade, se aplicável
    if (paymentLinkSetting.city) {
      urlParams.append('city', paymentLinkSetting.city.name);
    }
    
    // Adicionar referência ao imóvel, se aplicável
    if (propertyId) {
      urlParams.append('property_id', propertyId);
      
      // Opcionalmente, buscar detalhes do imóvel para adicionar à URL
      try {
        const property = await prisma.property.findUnique({
          where: { id: propertyId },
          select: { title: true, price: true },
        });
        
        if (property) {
          urlParams.append('property_title', property.title);
          urlParams.append('property_price', property.price.toString());
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do imóvel:', error);
        // Continuar mesmo se não conseguir buscar detalhes do imóvel
      }
    }
    
    // Adicionar timestamp para evitar cache
    urlParams.append('timestamp', Date.now().toString());
    
    // Adicionar parâmetros à URL
    if (paymentUrl.includes('?')) {
      paymentUrl += '&' + urlParams.toString();
    } else {
      paymentUrl += '?' + urlParams.toString();
    }

    return NextResponse.json({ paymentUrl });
  } catch (error) {
    console.error('Erro ao processar redirecionamento de pagamento:', error);
    return NextResponse.json({ error: 'Falha ao processar redirecionamento de pagamento' }, { status: 500 });
  }
}
