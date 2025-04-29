// src/app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import bcrypt from 'bcryptjs';

// POST /api/auth/reset-password - Redefinir senha com token válido
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json({ error: 'Token e nova senha são obrigatórios' }, { status: 400 });
    }

    // Validar requisitos de senha
    if (password.length < 8) {
      return NextResponse.json({ error: 'A senha deve ter pelo menos 8 caracteres' }, { status: 400 });
    }

    // Encontrar token no banco de dados
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
        expiresAt: {
          gte: new Date(), // Verificar se não expirou
        },
      },
      include: {
        user: true, // Incluir dados do usuário
      },
    });

    if (!resetToken) {
      return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 400 });
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Atualizar senha do usuário
    await prisma.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        passwordHash: hashedPassword,
      },
    });

    // Remover token usado (e quaisquer outros tokens expirados do mesmo usuário)
    await prisma.passwordResetToken.deleteMany({
      where: {
        OR: [
          { id: resetToken.id }, // Token atual
          { 
            userId: resetToken.userId,
            expiresAt: {
              lt: new Date(), // Tokens expirados
            },
          },
        ],
      },
    });

    return NextResponse.json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    return NextResponse.json({ error: 'Falha ao redefinir senha' }, { status: 500 });
  }
}
