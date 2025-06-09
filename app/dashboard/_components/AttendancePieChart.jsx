"use client"

import * as React from "react"
import { TrendingUp, Users, UserCheck, UserX, BarChart3 } from "lucide-react"
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"

const chartConfig = {
  students: {
    label: "Students",
  },
  present: {
    label: "Present",
    color: "hsl(142, 76%, 36%)", // green-600
  },
  absent: {
    label: "Absent", 
    color: "hsl(0, 84%, 60%)", // red-500
  },
}

function AttendancePieChart({ attendanceList = [], selectedYear = "", selectedDivision = "" }) {
  const [totalStudents, setTotalStudents] = React.useState(0);
  
  // Fetch total student count for the selected year/division
  React.useEffect(() => {
    const fetchTotalStudents = async () => {
      if (!selectedYear || !selectedDivision) {
        setTotalStudents(0);
        return;
      }
      
      try {
        const response = await fetch(`/api/students?year=${selectedYear}&division=${selectedDivision}`);
        const students = await response.json();
        setTotalStudents(students?.length || 0);
      } catch (error) {
        setTotalStudents(0);
      }
    };

    fetchTotalStudents();
  }, [selectedYear, selectedDivision]);

  // Calculate attendance data for pie chart
  const { pieData, totalPresent, totalAbsent, attendancePercentage } = React.useMemo(() => {
    if (!attendanceList || attendanceList.length === 0 || totalStudents === 0) {
      return {
        pieData: [],
        totalPresent: 0,
        totalAbsent: 0,
        attendancePercentage: 0
      }
    }

    // Calculate total present records with deduplication
    const processedRecords = new Set();
    let presentCount = 0;
    
    attendanceList.forEach(record => {
      if (record.date && record.studentId) {
        const recordKey = `${record.studentId}-${record.date}`;
        
        if (processedRecords.has(recordKey)) {
          return; // Skip duplicate records
        }
        processedRecords.add(recordKey);
        
        if (record.present === true) {
          presentCount++;
        }
      }
    });

    // Get unique dates to calculate total possible attendance
    const uniqueDates = new Set();
    attendanceList.forEach(record => {
      if (record.date) {
        uniqueDates.add(record.date);
      }
    });

    const totalPossibleAttendance = uniqueDates.size * totalStudents;
    const totalAbsentCount = totalPossibleAttendance - presentCount;
    const percentage = totalPossibleAttendance > 0 ? (presentCount / totalPossibleAttendance) * 100 : 0;

    const data = [
      {
        category: "present",
        students: presentCount,
        fill: "hsl(142, 76%, 36%)"
      },
      {
        category: "absent", 
        students: totalAbsentCount,
        fill: "hsl(0, 84%, 60%)"
      }
    ];

    return {
      pieData: data,
      totalPresent: presentCount,
      totalAbsent: totalAbsentCount,
      attendancePercentage: percentage
    };
  }, [attendanceList, totalStudents]);

  const totalAttendanceRecords = totalPresent + totalAbsent;
  if (pieData.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center h-[400px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
          <div className="text-muted-foreground/40 mb-4">
            <Users className="h-16 w-16" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">No attendance data available</h3>
          <p className="text-sm text-center max-w-md text-muted-foreground">
            Select a month, year, and division to view the attendance overview. Make sure attendance records exist for the selected period.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold tracking-tight">Monthly Attendance Overview</h3>
          <p className="text-sm text-muted-foreground">
            {selectedYear} {selectedDivision} - Present vs Absent Distribution
          </p>
        </div>
      </div>      {/* Main Chart */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {data.category === 'present' ? 'Present' : 'Absent'}
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {data.students} students
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={pieData}
                dataKey="students"
                nameKey="category"
                innerRadius={60}
                outerRadius={120}
                strokeWidth={2}
                cx="50%"
                cy="50%"
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {attendancePercentage.toFixed(1)}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Attendance
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Present</p>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {totalPresent}
              </div>
            </div>
            <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Absent</p>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {totalAbsent}
              </div>
            </div>
            <UserX className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {attendancePercentage.toFixed(1)}%
              </div>
            </div>
            <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendancePieChart
