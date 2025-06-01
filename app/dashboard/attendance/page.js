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
    <div className="p-10">
      <h2 className="text-2xl font-bold">Attendance</h2>

      <div className="flex gap-4 p-3 border rounded-lg shadow-sm my-5 items-center">
        <div className="flex gap-2 items-center">
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)}/>
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Year:</label>
          <YearSelect value={selectedYear} onChange={setSelectedYear} />
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Division:</label>
          <DivisionSelect value={selectedDivision} onChange={setSelectedDivision} year={selectedYear} />
        </div>
        <Button onClick = {()=> onSearchHandler()}> <SearchIcon/> Search</Button>
      </div>

      <AttendanceGrid 
        attendanceList={attendanceList}
        selectedMonth={selectedMonth}
      />

    </div>
  );
}

export default Attendance;
