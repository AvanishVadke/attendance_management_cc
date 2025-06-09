import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const yearParam = searchParams.get('year'); // 'SE', 'TE', or 'BE'
        const divisionParam = searchParams.get('division'); // 'A', 'B', or 'C'
        const monthParam = searchParams.get('month'); // month as string like "01", "02", etc.
        const academicYear = searchParams.get('academicYear') || new Date().getFullYear().toString(); // actual year, defaults to current year

        // Validate required parameters
        if (!yearParam || !divisionParam || !monthParam) {
            return NextResponse.json({ 
                error: 'Missing required parameters: year, division, and month are required' 
            }, { status: 400 });
        }

        const month = Number(monthParam); // convert to number for calculations
        
        // For date filtering, use provided academic year or default to current year
        const yearNumber = Number(academicYear);

        // Calculate first and last day of the month as YYYY-MM-DD strings
        const firstDayStr = `${yearNumber}-${monthParam.padStart(2, '0')}-01`;
        const nextMonth = month === 12 ? 1 : month + 1;
        const nextMonthYear = month === 12 ? yearNumber + 1 : yearNumber;
        const lastDayStr = `${nextMonthYear}-${nextMonth.toString().padStart(2, '0')}-01`;

        // Debug: log filter values
        console.log('Dashboard API called with:', { 
            yearParam, 
            divisionParam, 
            monthParam,
            academicYear,
            month, 
            yearNumber,
            firstDayStr, 
            lastDayStr 
        });        // Debug: log filter values
        console.log('Dashboard API called with:', { 
            yearParam, 
            divisionParam, 
            monthParam,
            academicYear,
            yearNumber,
            firstDayStr, 
            lastDayStr 
        });

        // Filter attendance records and group by day - only count present attendance
        const result = await prisma.attendance.groupBy({
            by: ['day'],
            where: {
                student: {
                    year: yearParam,
                    division: divisionParam
                },
                date: {
                    gte: firstDayStr,
                    lt: lastDayStr
                },
                present: true // Only count present attendance
            },
            _count: {
                day: true
            },
            orderBy: {
                day: 'asc'
            }
        });

        console.log('GroupBy result:', result);

        // Format result as [{ day, presentCount }]
        const formatted = result.map(r => ({
            day: r.day,
            presentCount: r._count.day
        }));

        console.log('Formatted result:', formatted);
        return NextResponse.json(formatted);
    } catch (error) {
        console.error('Dashboard API error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}