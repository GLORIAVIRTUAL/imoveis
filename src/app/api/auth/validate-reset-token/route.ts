// src/app/api/auth/validate-reset-token/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

// POST /api/auth/validate-reset-token - Validar token de redefinição
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: 'Token é obrigatório' }, { status: 400 });
    }

    // Encontrar token no banco de dados
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
        expiresAt: {
          gte: new Date(), // Verificar se não expirou
        },
      },
    });

    if (!resetToken) {
      return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 400 });
    }

    // Token é válido
    return NextResponse.json({ message: 'Token válido' });
  } catch (error) {
    console.error('Erro ao validar token de redefinição:', error);
    return NextResponse.json({ error: 'Falha ao validar token' }, { status: 500 });
  }
}
