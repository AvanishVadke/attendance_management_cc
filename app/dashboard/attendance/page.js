"use client"

import MonthSelection from "@/app/_components/MonthSelection";
import YearSelect from "@/app/_components/YearSelect";
import DivisionSelect from "@/app/_components/DivisionSelect";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import GlobalApi from "@/app/_services/GlobalApi";
import moment from "moment";
import AttendanceGrid from "./_components/AttendanceGrid";

function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);

  const onSearchHandler = () => {
    console.log('Year:', selectedYear, 'Month:', selectedMonth, 'Division:', selectedDivision);
    const month = selectedMonth ? moment(selectedMonth).format("MM") : undefined;
    GlobalApi.getAttendanceList(selectedYear, selectedDivision, month)
      .then(res => {
        // Fetch all students for the selected year/division
        GlobalApi.getAllStudents().then(stuRes => {
          const students = (stuRes.data || []).filter(
            s => s.year === selectedYear && s.division === selectedDivision
          );
          // Merge attendance with student data for the grid
          const attendanceData = res.data || [];
          // Build a map: studentId -> [{...attendance records}]
          const attendanceMap = {};
          attendanceData.forEach(a => {
            if (!attendanceMap[a.studentId]) attendanceMap[a.studentId] = [];
            attendanceMap[a.studentId].push(a);
          });
          // Build the list for the grid
          const attendanceList = students.map(student => {
            return {
              ...student,
              attendances: attendanceMap[student.id] || []
            };
          });
          setAttendanceList(attendanceList);
          console.log('attendanceList:', attendanceList);
        });
      })
      .catch(err => {
        console.error('Attendance API error:', err);
      });
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold">Attendance</h2>

      {/* Search Controls - responsive layout */}
      <div className="bg-card p-4 md:p-6 border rounded-lg shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Month:</label>
            <MonthSelection selectedMonth={(value) => setSelectedMonth(value)}/>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Year:</label>
            <YearSelect value={selectedYear} onChange={setSelectedYear} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Division:</label>
            <DivisionSelect value={selectedDivision} onChange={setSelectedDivision} year={selectedYear} />
          </div>
          <Button onClick={() => onSearchHandler()} className="w-full sm:w-auto">
            <SearchIcon className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Attendance Grid */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <AttendanceGrid 
          attendanceList={attendanceList}
          selectedMonth={selectedMonth}
          onAttendanceChanged={() => onSearchHandler()}
        />
      </div>
    </div>
  );
}

export default Attendance;
