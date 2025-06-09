"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import MonthSelection from '../_components/MonthSelection'
import { Year } from '@/lib/generated/prisma'
import YearSelect from '../_components/YearSelect'
import DivisionSelect from '../_components/DivisionSelect'
import GlobalApi from '../_services/GlobalApi'
import moment from 'moment'
import StatusList from './_components/StatusList'
import BarChart from './_components/BarChart'
import AttendancePieChart from './_components/AttendancePieChart'

function Dashboard() {
  const { setTheme } = useTheme()
  const [selectedMonth, setSelectedMonth] = useState(new Date()); // Set default to current month
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDivision, setSelectedDivision] = useState(""); 
  const [attendanceList, setAttendanceList] = useState([]); 
  const [dailyAttendanceStats, setDailyAttendanceStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTheme('system')
  }, [setTheme]);
  useEffect(() => {
    if (selectedYear && selectedDivision && selectedMonth) {
      getStudentAttendance();
      GetPresentTotalCountByDay();
    }
  }, [selectedMonth, selectedYear, selectedDivision]);const getStudentAttendance = async () => {
    const month = selectedMonth ? moment(selectedMonth).format("MM") : undefined;
    const currentYear = new Date().getFullYear();
    const academicYear = currentYear; // Always use current year for academic year
    
    try {
      setIsLoading(true);
      // Fix parameter order: year (TE/SE/BE), division, month, academicYear
      const res = await GlobalApi.getAttendanceList(selectedYear, selectedDivision, month, academicYear);
      setAttendanceList(res.data || []);    } catch (err) {
      setAttendanceList([]);
    } finally {
      setIsLoading(false);
    }
  }
  const GetPresentTotalCountByDay = async () => {
    const month = selectedMonth ? moment(selectedMonth).format("MM") : undefined;
    const currentYear = new Date().getFullYear();
    const academicYear = currentYear; // Always use current year for academic year
    
    if (!month) {
      setDailyAttendanceStats([]);
      return;
    }
    
    try {
      // Fix parameter order: year (TE/SE/BE), division, month, academicYear
      const res = await GlobalApi.TotalPresentCountByDay(selectedYear, selectedDivision, month, academicYear);
            setDailyAttendanceStats(res.data || []);
    } catch (err) {
      setDailyAttendanceStats([]);
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">Dashboard</h2>

        {/* Controls - responsive layout */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2">
            <MonthSelection selectedMonth={setSelectedMonth}/>
            <YearSelect value={selectedYear} onChange={setSelectedYear} />
            <DivisionSelect value={selectedDivision} onChange={setSelectedDivision} year={selectedYear} />
          </div>
        </div>
      </div>
      
      {/* Status Cards */}
      <StatusList attendanceList={attendanceList} />
      
      {/* Charts Section - responsive grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <BarChart 
            attendanceList={attendanceList} 
            dailyAttendanceStats={dailyAttendanceStats}
            selectedYear={selectedYear}
            selectedDivision={selectedDivision}
          />
        </div>
        <div className="xl:col-span-1">
          <AttendancePieChart 
            attendanceList={attendanceList}
            selectedYear={selectedYear}
            selectedDivision={selectedDivision}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard