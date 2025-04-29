// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import bcrypt from 'bcryptjs';
import { MaritalStatus } from '@/generated/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      cpf,
      phone,
      address,
      cep,
      rg,
      maritalStatus, // Expecting enum value like 'SOLTEIRO'
    } = body;

    // Basic validation
    if (!name || !email || !password || !cpf || !phone) {
      return NextResponse.json({ error: 'Nome, email, senha, CPF e telefone são obrigatórios' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json({ error: 'Email já cadastrado' }, { status: 409 });
    }
    const existingCpf = await prisma.user.findUnique({
        where: { cpf },
    });
    if (existingCpf) {
        return NextResponse.json({ error: 'CPF já cadastrado' }, { status: 409 });
    }

    // Validate maritalStatus if provided
    let validMaritalStatus: MaritalStatus | undefined = undefined;
    if (maritalStatus && Object.values(MaritalStatus).includes(maritalStatus as MaritalStatus)) {
        validMaritalStatus = maritalStatus as MaritalStatus;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        cpf,
        phone,
        address,
        cep,
        rg,
        maritalStatus: validMaritalStatus,
      },
      // Select only non-sensitive fields to return
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true,
        createdAt: true,
      }
    });

    // Here you might want to send a confirmation email

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Falha ao registrar usuário' }, { status: 500 });
  }
}

