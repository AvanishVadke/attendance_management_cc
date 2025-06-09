import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Helper to get YYYY-MM from date string
function getYearMonth(dateStr) {
  // Accepts YYYY-MM-DD or YYYY-MM
  return dateStr.slice(0, 7);
}

// GET /api/attendance
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year'); // SE, TE, BE
    const division = searchParams.get('division'); // A, B, C
    const month = searchParams.get('month'); // month as string (01-12)
    const academicYear = searchParams.get('academicYear') || new Date().getFullYear().toString(); // actual year, defaults to current year

    console.log('Attendance API called with:', { year, division, month, academicYear });

    let studentWhere = {};
    if (year) studentWhere.year = year;
    if (division) studentWhere.division = division;

    // Fetch all attendance for students in the year/division
    const attendance = await prisma.attendance.findMany({
      include: {
        student: true
      },
      where: {
        ...(studentWhere.year || studentWhere.division ? {
          student: studentWhere
        } : {})
      }
    });

    console.log(`Found ${attendance.length} attendance records before filtering`);

    // Filter by month and academic year using ISO format
    let filtered = attendance;
    if (month && academicYear) {
      const monthStr = month.padStart(2, '0');
      const yearMonth = `${academicYear}-${monthStr}`;
      console.log('Filtering by yearMonth:', yearMonth);
      filtered = attendance.filter(a => {
        const attendanceYearMonth = getYearMonth(a.date);
        console.log(`Comparing ${attendanceYearMonth} with ${yearMonth}`);
        return attendanceYearMonth === yearMonth;
      });
    }

    console.log(`Filtered to ${filtered.length} attendance records`);
    return NextResponse.json(filtered);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ error: 'Error fetching attendance' }, { status: 500 });
  }
}

// POST /api/attendance
export async function POST(req) {
  try {
    const body = await req.json();
    const { studentId, present, day, date } = body;

    if (!studentId || typeof present !== 'boolean' || !day || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const attendance = await prisma.attendance.create({
      data: { studentId, present, day, date },
    });

    return NextResponse.json(attendance, { status: 200 });
  } catch (error) {
    console.error("Error creating attendance:", error);
    return NextResponse.json({ error: "Error creating attendance" }, { status: 500 });
  }
}

// DELETE /api/attendance
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = parseInt(searchParams.get('studentId'));
    const day = parseInt(searchParams.get('day'));
    const date = searchParams.get('date');

    // Validation
    if (!studentId || !day || !date) {
      return NextResponse.json({ error: 'Missing required fields: studentId, day, and date are required' }, { status: 400 });
    }

    // Find and delete the attendance record
    const attendance = await prisma.attendance.deleteMany({
      where: {
        studentId,
        day,
        date
      }
    });

    if (attendance.count === 0) {
      return NextResponse.json({ error: 'No attendance record found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Attendance record deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting attendance:", error);
    return NextResponse.json({ error: "Error deleting attendance" }, { status: 500 });
  }
}