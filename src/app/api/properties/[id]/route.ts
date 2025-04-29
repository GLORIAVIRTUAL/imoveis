// src/app/api/properties/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { PropertyStatus } from '@/generated/prisma';

interface Params {
  params: { id: string };
}

// GET /api/properties/{id} - Fetch a single property by ID
export async function GET(request: Request, { params }: Params) {
  const { id } = params;

  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        city: true,
        user: { select: { name: true, email: true, phone: true } }, // Include seller info
        images: { orderBy: { order: 'asc' } }, // Include all images ordered
      },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Optionally, restrict access based on status or ownership if needed
    // if (property.status !== PropertyStatus.ATIVO && !isOwnerOrAdmin) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    return NextResponse.json(property);
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

// PUT /api/properties/{id} - Update a property by ID
export async function PUT(request: Request, { params }: Params) {
  const { id } = params;

  try {
    const body = await request.json();
    const {
      title,
      neighborhood,
      description,
      price,
      type,
      bedrooms,
      bathrooms,
      area,
      features,
      status, // Allow updating status (e.g., ATIVO after payment)
      // cityId should generally not be changed, handle with care if needed
    } = body;

    // Add validation and authorization checks here (e.g., ensure user owns the property or is admin)

    const updateData: any = {};
    if (title) updateData.title = title;
    if (neighborhood) updateData.neighborhood = neighborhood;
    if (description) updateData.description = description;
    if (price) updateData.price = parseFloat(price);
    if (type) updateData.type = type;
    if (bedrooms !== undefined) updateData.bedrooms = bedrooms ? parseInt(bedrooms, 10) : null;
    if (bathrooms !== undefined) updateData.bathrooms = bathrooms ? parseInt(bathrooms, 10) : null;
    if (area !== undefined) updateData.area = area ? parseFloat(area) : null;
    if (features) updateData.features = features;
    if (status && Object.values(PropertyStatus).includes(status)) {
        updateData.status = status;
        // Potentially update depositPaid based on status change
        if (status === PropertyStatus.ATIVO) {
            updateData.depositPaid = true;
        }
    }

    const updatedProperty = await prisma.property.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error(`Error updating property ${id}:`, error);
    // Handle specific errors like P2025 (Record not found)
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

// DELETE /api/properties/{id} - Delete a property by ID
export async function DELETE(request: Request, { params }: Params) {
  const { id } = params;

  try {
    // Add validation and authorization checks here (e.g., ensure user owns the property or is admin)

    // Need to delete related images first if using cloud storage without cascade deletes
    // await prisma.propertyImage.deleteMany({ where: { propertyId: id } });

    await prisma.property.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Property deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting property ${id}:`, error);
    // Handle specific errors like P2025 (Record not found)
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}

