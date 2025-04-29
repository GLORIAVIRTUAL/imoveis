// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 }); // User not found
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 }); // Invalid password
    }

    // Generate JWT token
    console.log("[Login API] JWT_SECRET is set:", !!process.env.JWT_SECRET);
    const token = generateToken(user.id);

    // Set cookie
    const cookieStore = cookies();
    cookieStore.set({ // Removido await
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Alterado de 'strict' para 'lax' para permitir redirecionamentos
      maxAge: 60 * 60 * 24 * 7, // 7 dias em segundos
      path: '/',
    });

    // Return token and user info (excluding password)
    const { passwordHash, ...userWithoutPassword } = user;
    
    // REMOVIDO: Não precisamos mais retornar o redirect na resposta da API
    // const url = new URL(request.url);
    // const redirectUrl = url.searchParams.get('redirect') || '/';
    
    return NextResponse.json({ 
      token, 
      user: userWithoutPassword,
      // REMOVIDO: redirect: redirectUrl
    });

  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json({ error: 'Falha ao fazer login' }, { status: 500 });
  }
}

