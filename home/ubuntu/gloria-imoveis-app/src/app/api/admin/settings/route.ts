// src/app/api/admin/settings/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

// Helper function to extract token and verify admin
const verifyAdmin = async (request: Request): Promise<{ isAdmin: boolean; userId?: string }> => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { isAdmin: false };
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    // Here you would check if the user is an admin
    // For now, we'll assume all authenticated users can access admin settings
    // In a real app, you'd have a role field in the user model
    
    return { isAdmin: true, userId: decoded.userId };
  } catch (error) {
    return { isAdmin: false };
  }
};

// GET /api/admin/settings - Get all settings
export async function GET(request: Request) {
  try {
    // Verify admin access
    const { isAdmin } = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get('cityId'); // Optional city filter

    const where = cityId ? { cityId } : {};

    const settings = await prisma.adminSetting.findMany({
      where,
      include: {
        city: true, // Include city details
      },
      orderBy: {
        settingKey: 'asc',
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching admin settings:', error);
    return NextResponse.json({ error: 'Falha ao buscar configurações' }, { status: 500 });
  }
}

// POST /api/admin/settings - Create or update a setting
export async function POST(request: Request) {
  try {
    // Verify admin access
    const { isAdmin } = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { settingKey, settingValue, cityId } = body;

    // Basic validation
    if (!settingKey || !settingValue) {
      return NextResponse.json({ error: 'Chave e valor são obrigatórios' }, { status: 400 });
    }

    // Check if setting already exists
    const existingSetting = await prisma.adminSetting.findFirst({
      where: {
        settingKey,
        cityId: cityId || null,
      },
    });

    let setting;
    if (existingSetting) {
      // Update existing setting
      setting = await prisma.adminSetting.update({
        where: { id: existingSetting.id },
        data: { settingValue },
        include: { city: true },
      });
    } else {
      // Create new setting
      setting = await prisma.adminSetting.create({
        data: {
          settingKey,
          settingValue,
          cityId: cityId || null,
        },
        include: { city: true },
      });
    }

    return NextResponse.json(setting);
  } catch (error) {
    console.error('Error saving admin setting:', error);
    return NextResponse.json({ error: 'Falha ao salvar configuração' }, { status: 500 });
  }
}

// DELETE /api/admin/settings - Delete a setting
export async function DELETE(request: Request) {
  try {
    // Verify admin access
    const { isAdmin } = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID da configuração é obrigatório' }, { status: 400 });
    }

    await prisma.adminSetting.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Configuração excluída com sucesso' });
  } catch (error) {
    console.error('Error deleting admin setting:', error);
    return NextResponse.json({ error: 'Falha ao excluir configuração' }, { status: 500 });
  }
}
