// src/app/api/properties/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { PropertyStatus } from '@/generated/prisma'; // Import enum

// GET /api/properties - Fetch multiple properties (with filtering/pagination)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const neighborhood = searchParams.get('neighborhood');
  const type = searchParams.get('type'); // 'VENDA' or 'ALUGUEL'
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const bedrooms = searchParams.get('bedrooms');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const where: any = {
    status: PropertyStatus.ATIVO, // Only show active properties by default
  };

  if (city) {
    // Assuming city name is unique for simplicity, adjust if needed
    const cityRecord = await prisma.city.findFirst({ where: { name: city } });
    if (cityRecord) {
      where.cityId = cityRecord.id;
    }
  }
  if (neighborhood) {
    where.neighborhood = { contains: neighborhood, mode: 'insensitive' };
  }
  if (type && (type === 'VENDA' || type === 'ALUGUEL')) {
    where.type = type;
  }
  if (minPrice) {
    where.price = { ...where.price, gte: parseFloat(minPrice) };
  }
  if (maxPrice) {
    where.price = { ...where.price, lte: parseFloat(maxPrice) };
  }
  if (bedrooms) {
    where.bedrooms = { gte: parseInt(bedrooms, 10) };
  }

  try {
    const properties = await prisma.property.findMany({
      where,
      include: {
        city: true, // Include city details
        images: { orderBy: { order: 'asc' }, take: 1 }, // Include first image
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalProperties = await prisma.property.count({ where });

    return NextResponse.json({
      data: properties,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalProperties / limit),
        totalItems: totalProperties,
      },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

// POST /api/properties - Create a new property
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      cityId, // Expecting city ID from frontend
      neighborhood,
      description,
      price,
      type, // 'VENDA' or 'ALUGUEL'
      bedrooms,
      bathrooms,
      area,
      features,
      userId, // Assuming userId is passed after authentication
      // images will be handled separately, maybe via a dedicated upload endpoint
    } = body;

    // Basic validation
    if (!title || !cityId || !neighborhood || !description || !price || !type || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProperty = await prisma.property.create({
      data: {
        title,
        cityId,
        neighborhood,
        description,
        price: parseFloat(price),
        type,
        bedrooms: bedrooms ? parseInt(bedrooms, 10) : null,
        bathrooms: bathrooms ? parseInt(bathrooms, 10) : null,
        area: area ? parseFloat(area) : null,
        features: features || [],
        userId,
        status: PropertyStatus.PENDENTE_PAGAMENTO, // Initial status
        depositPaid: false,
      },
    });

    // Here you would typically trigger the payment process
    // For now, we just return the created property with PENDING status

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    // Check for specific Prisma errors if needed
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}

