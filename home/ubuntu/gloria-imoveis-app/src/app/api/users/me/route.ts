// src/app/api/users/me/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

// Helper function to extract token from Authorization header
const extractToken = (request: Request): string | null => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
};

// GET /api/users/me - Get current user profile
export async function GET(request: Request) {
  try {
    // Extract token
    const token = extractToken(request);
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true,
        address: true,
        cep: true,
        rg: true,
        maritalStatus: true,
        createdAt: true,
        updatedAt: true,
        // Include user's properties
        properties: {
          select: {
            id: true,
            title: true,
            price: true,
            type: true,
            status: true,
            createdAt: true,
            // Include first image of each property
            images: {
              take: 1,
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Falha ao buscar perfil do usuário' }, { status: 500 });
  }
}

// PUT /api/users/me - Update current user profile
export async function PUT(request: Request) {
  try {
    // Extract token
    const token = extractToken(request);
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      phone,
      address,
      cep,
      rg,
      maritalStatus,
      // Don't allow changing email or CPF directly for security reasons
    } = body;

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        name,
        phone,
        address,
        cep,
        rg,
        maritalStatus,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true,
        address: true,
        cep: true,
        rg: true,
        maritalStatus: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Falha ao atualizar perfil do usuário' }, { status: 500 });
  }
}
