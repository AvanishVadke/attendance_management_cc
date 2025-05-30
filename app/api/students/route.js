// app/api/students/route.js
import { PrismaClient } from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Get all students
export async function GET(request) {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ error: "Error fetching students" }, { status: 500 });
  }
}

// Create new student
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.year || !body.division) {
      return NextResponse.json(
        { error: "Name, year, and division are required" },
        { status: 400 }
      );
    }

    // Create student
    const student = await prisma.student.create({
      data: {
        name: body.name,
        year: body.year,
        division: body.division
      }
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "Error creating student" },
      { status: 500 }
    );
  }
}

// Delete student
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    await prisma.student.delete({
      where: {
        id: parseInt(id)
      }
    });

    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Error deleting student" },
      { status: 500 }
    );
  }
}

// Update student
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    const student = await prisma.student.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name: body.name,
        year: body.year,
        division: body.division
      }
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Error updating student" },
      { status: 500 }
    );
  }
}
