// src/app/api/email/route.ts
import { NextResponse } from 'next/server';
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

// POST /api/email - Send email
export async function POST(request: Request) {
  try {
    // Verify authentication (optional, depending on your use case)
    const { isAuth } = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { to, subject, text, html, attachments } = body;

    // Basic validation
    if (!to || !subject || (!text && !html)) {
      return NextResponse.json({ error: 'Destinatário, assunto e conteúdo são obrigatórios' }, { status: 400 });
    }

    // Send email
    const result = await sendEmail({
      to,
      subject,
      text: text || '',
      html: html || '',
      attachments,
    });

    if (result.success) {
      return NextResponse.json({ message: 'Email enviado com sucesso' });
    } else {
      return NextResponse.json({ error: 'Falha ao enviar email' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Falha ao enviar email' }, { status: 500 });
  }
}
