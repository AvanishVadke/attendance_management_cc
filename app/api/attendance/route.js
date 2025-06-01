import { PrismaClient } from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET /api/attendance
export async function GET(request) {
  try {
    // Optionally, filter by query params (e.g., year, division, month, etc.)
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const division = searchParams.get('division');
    const month = searchParams.get('month');

    // Build where clause for students
    let studentWhere = {};
    if (year) studentWhere.year = year;
    if (division) studentWhere.division = division;

    // Find attendance records, join with student (fix relation)
    const attendance = await prisma.attendance.findMany({
      include: {
        student: true // This will error unless Attendance has a relation to Student
      },
      where: {
        ...(studentWhere.year || studentWhere.division ? {
          student: studentWhere
        } : {}),
        ...(month && { date: { contains: `-${month}-` } })
      }
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ error: 'Error fetching attendance' }, { status: 500 });
  }
}
