import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import moment from "moment";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function AttendanceGrid({ attendanceList, selectedMonth }) {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "studentId", headerName: "Student Id" },
    { field: "name", headerName: "Name" },
  ]);

  useEffect(() => {
    // Calculate days in selected month (always show days columns)
    let year = 2025,
      month = 5; // Defaults: June 2025
    if (selectedMonth) {
      year = parseInt(moment(selectedMonth).format("YYYY"), 10);
      month = parseInt(moment(selectedMonth).format("MM"), 10) - 1;
    }
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

    setColDefs([
      { field: "studentId", headerName: "Student Id" },
      { field: "name", headerName: "Name" },
      ...daysArray.map((date) => ({
        field: date.toString(),
        width: 80,
        editable: true,
      })),
    ]);

    // Build userList from attendanceList
    const userList = (attendanceList || []).map((student) => {
      const row = { studentId: student.id, name: student.name };
      daysArray.forEach((day) => {
        // Find if present for this day
        const present = (student.attendances || []).some(
          (a) =>
            (a.day === day ||
              (a.date && new Date(a.date).getDate() === day)) &&
            a.present === true
        );
        row[day] = present;
      });
      return row;
    });
    setRowData(userList);
  }, [attendanceList, selectedMonth]);

  return (
    <div>
      <div
        className="ag-theme-quartz rounded-2xl p-6 w-full min-h-[400px] overflow-auto bg-black"
        style={{ height: 500 }}
        data-ag-theme-mode="dark"
      >
        <style>{`
                    .ag-theme-quartz, .ag-theme-quartz-dark {
                        background: #000 !important;
                        border-radius: 1rem !important;
                    }
                    .ag-root-wrapper {
                        background: #000 !important;
                        border-radius: 1rem !important;
                    }
                    .ag-header {
                        background: #18181b !important;
                        color: #fff !important;
                        font-weight: 600;
                        font-size: 1rem;
                    }
                    .ag-row {
                        background: #18181b !important;
                        color: #fff !important;
                        font-size: 1rem;
                        border-radius: 0.5rem !important;
                        margin-bottom: 0.5rem !important;
                    }
                    .ag-row-selected {
                        background: #27272a !important;
                    }
                `}</style>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
}

export default AttendanceGrid;