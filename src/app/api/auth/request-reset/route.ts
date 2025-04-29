// src/app/api/auth/request-reset/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { sendEmail } from '@/lib/email';
import crypto from 'crypto';

// POST /api/auth/request-reset - Solicitar redefinição de senha
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 });
    }

    // Encontrar usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Não revelar se o email existe ou não por segurança
      return NextResponse.json({ message: 'Se um usuário com este email existir, um link de redefinição será enviado.' });
    }

    // Gerar token de redefinição
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // Expira em 1 hora

    // Salvar token no banco de dados
    await prisma.passwordResetToken.create({
      data: {
        token,
        expiresAt,
        userId: user.id,
      },
    });

    // Construir link de redefinição
    const resetLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-senha?token=${token}`;

    // Enviar email de redefinição
    const emailSubject = 'Redefinição de Senha - Glória Imóveis';
    const emailText = `
      Olá ${user.name},
      
      Você solicitou a redefinição de sua senha no Glória Imóveis.
      
      Clique no link abaixo para criar uma nova senha. Este link expirará em 1 hora.
      
      ${resetLink}
      
      Se você não solicitou esta redefinição, por favor ignore este email.
      
      Obrigado,
      Equipe Glória Imóveis
    `;
    const emailHtml = `
      <h2>Redefinição de Senha</h2>
      
      <p>Olá ${user.name},</p>
      
      <p>Você solicitou a redefinição de sua senha no Glória Imóveis.</p>
      
      <p>Clique no link abaixo para criar uma nova senha. Este link expirará em 1 hora:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      
      <p>Se você não solicitou esta redefinição, por favor ignore este email.</p>
      
      <p>Obrigado,<br>Equipe Glória Imóveis</p>
    `;

    await sendEmail({
      to: user.email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    return NextResponse.json({ message: 'Se um usuário com este email existir, um link de redefinição será enviado.' });
  } catch (error) {
    console.error('Erro ao solicitar redefinição de senha:', error);
    // Retornar mensagem genérica mesmo em caso de erro interno
    return NextResponse.json({ message: 'Se um usuário com este email existir, um link de redefinição será enviado.' });
  }
}
