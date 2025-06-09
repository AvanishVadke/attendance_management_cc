"use client"

import React from 'react'
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { TrendingUp, Users, UserCheck, UserX } from "lucide-react"

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(142, 76%, 36%)", // green-600
    icon: UserCheck,
  },
  absent: {
    label: "Absent", 
    color: "hsl(0, 84%, 60%)", // red-500
    icon: UserX,
  },
}

function BarChart({ attendanceList = [], dailyAttendanceStats = [], selectedYear = "", selectedDivision = "" }) {
  const [totalStudents, setTotalStudents] = React.useState(0);

  // Fetch total student count for the selected year/division
  React.useEffect(() => {
    const fetchTotalStudents = async () => {
      if (!selectedYear || !selectedDivision) {
        setTotalStudents(0);
        return;
      }      try {
        const response = await fetch(`/api/students?year=${selectedYear}&division=${selectedDivision}`);
        const students = await response.json();
        setTotalStudents(students?.length || 0);
      } catch (error) {
        setTotalStudents(0);
      }
    };

    fetchTotalStudents();
  }, [selectedYear, selectedDivision]);  // Process attendance data for the chart with proper deduplication
  const chartData = React.useMemo(() => {
    if (!attendanceList || attendanceList.length === 0 || totalStudents === 0) {
      return []
    }

    // Group attendance by date with deduplication
    const dateGroups = {}
    const processedRecords = new Set() // Track processed studentId + date combinations
    
    attendanceList.forEach(record => {
      if (record.date && record.studentId) {
        // Create unique key for student + date to avoid duplicates
        const recordKey = `${record.studentId}-${record.date}`;
        
        if (processedRecords.has(recordKey)) {
          return; // Skip duplicate records
        }
        processedRecords.add(recordKey);
        
        // Parse the date string (format: "2025-06-01")
        const date = new Date(record.date)
        if (isNaN(date.getTime())) {
          return
        }        
        const dateKey = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })
        
        if (!dateGroups[dateKey]) {
          dateGroups[dateKey] = {
            date: dateKey,
            present: 0,
            absent: 0,
            total: totalStudents
          }
        }
        
        // Only count present records (records with present: true)
        if (record.present === true) {
          dateGroups[dateKey].present++
        }
      }
    })

    // Calculate absent students for each day
    Object.keys(dateGroups).forEach(dateKey => {
      dateGroups[dateKey].absent = totalStudents - dateGroups[dateKey].present;
    });

    // Convert to array and sort by date
    const result = Object.values(dateGroups).sort((a, b) => {
      const currentYear = new Date().getFullYear()
      const dateA = new Date(a.date + ', ' + currentYear)
      const dateB = new Date(b.date + ', ' + currentYear)
      return dateA - dateB
    })    
    return result
  }, [attendanceList, totalStudents]);

  if (chartData.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center h-[400px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
          <div className="text-muted-foreground/40 mb-4">
            <TrendingUp className="h-16 w-16" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">No attendance data available</h3>
          <p className="text-sm text-center max-w-md text-muted-foreground">
            Select a month, year, and division to view the attendance chart. Make sure attendance records exist for the selected period.
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold tracking-tight">Daily Attendance</h3>          <p className="text-sm text-muted-foreground">
            Track daily student presence and absence patterns over time
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>{chartData.length} days recorded</span>
        </div>
      </div>

      {/* Main Chart */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6 pb-2">
          <ResponsiveContainer width="100%" height={400}>
            <RechartsBarChart 
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e2e8f0" 
                vertical={false}
              />
              <XAxis 
                dataKey="date"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                domain={[0, totalStudents + 1]}
              />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="present" 
                fill="#16a34a"
                radius={[2, 2, 0, 0]}
                name="Present"
              />
              <Bar 
                dataKey="absent" 
                fill="#dc2626"
                radius={[2, 2, 0, 0]}
                name="Absent"
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Present</p>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {chartData.reduce((sum, day) => sum + day.present, 0)}
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
                {chartData.reduce((sum, day) => sum + day.absent, 0)}
              </div>
            </div>
            <UserX className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Average Daily Total</p>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(chartData.reduce((sum, day) => sum + day.total, 0) / chartData.length)}
              </div>
            </div>
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarChart