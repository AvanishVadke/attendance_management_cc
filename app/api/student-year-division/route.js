// app/api/student-year-division/route.js
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Get all year-division combinations
export async function GET(request) {
  try {
    const yearDivisions = await prisma.studentYearDivision.findMany({
      orderBy: {
        year: 'asc'
      }
    });
    return NextResponse.json(yearDivisions);
  } catch (error) {
    console.error("Error fetching year divisions:", error);
    return NextResponse.json(
      { error: "Error fetching year divisions" },
      { status: 500 }
    );
  }
}

// Create new year-division combination
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.year || !body.division) {
      return NextResponse.json(
        { error: "Year and division are required" },
        { status: 400 }
      );
    }

    // Check if combination already exists
    const existing = await prisma.studentYearDivision.findFirst({
      where: {
        year: body.year,
        division: body.division
      }
    });

    if (existing) {
      return NextResponse.json(
        { error: "This year-division combination already exists" },
        { status: 400 }
      );
    }

    // Create year-division combination
    const yearDivision = await prisma.studentYearDivision.create({
      data: {
        year: body.year,
        division: body.division
      }
    });

    return NextResponse.json(yearDivision, { status: 201 });
  } catch (error) {
    console.error("Error creating year division:", error);
    return NextResponse.json(
      { error: "Error creating year division" },
      { status: 500 }
    );
  }
}

// Delete year-division combination
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    await prisma.studentYearDivision.delete({
      where: {
        id: parseInt(id)
      }
    });

    return NextResponse.json({ message: "Year-division combination deleted successfully" });
  } catch (error) {
    console.error("Error deleting year division:", error);
    return NextResponse.json(
      { error: "Error deleting year division" },
      { status: 500 }
    );
  }
}
