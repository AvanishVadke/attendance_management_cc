"use client"

import MonthSelection from "@/app/_components/MonthSelection";
import YearSelect from "@/app/_components/YearSelect";
import DivisionSelect from "@/app/_components/DivisionSelect";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";

function Attendace() {

  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [selectedDivision, setSelectedDivision] = useState();
  
  const onSearchHandler = () => {

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
    </div>
  );
}

export default Attendace;
