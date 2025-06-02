import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import moment from "moment";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

ModuleRegistry.registerModules([AllCommunityModule]);

function AttendanceGrid({ attendanceList, selectedMonth, onAttendanceChanged }) {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "studentId", headerName: "Student Id"},
    { field: "name", headerName: "Name"},
  ]);

  useEffect(() => {
    let year, month;
    if (selectedMonth && moment(selectedMonth).isValid()) {
      year = parseInt(moment(selectedMonth).format("YYYY"), 10);
      month = parseInt(moment(selectedMonth).format("MM"), 10); // 1-based
    } else {
      year = moment().year();
      month = moment().month() + 1; // 1-based
    }
    const numberOfDays = new Date(year, month, 0).getDate(); // month is 1-based
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

    setColDefs([
      { field: "studentId", headerName: "Student Id", filter:true },
      { field: "name", headerName: "Name", filter:true },
      ...daysArray.map((date) => ({
        field: date.toString(),
        width: 80,
        editable: true,
      })),
    ]);

    const userList = (attendanceList || []).map((student) => {
      const row = { studentId: student.id, name: student.name };
      daysArray.forEach((day) => {
        const present = (student.attendances || []).some((a) => {
          const attDate = moment(a.date, "YYYY-MM-DD");
          return (
            a.day === day &&
            attDate.isValid() &&
            attDate.date() === day &&
            (attDate.month() + 1) === month && // 1-based
            attDate.year() === year &&
            a.present === true
          );
        });
        row[day] = present;
      });
      return row;
    });
    setRowData(userList);
  }, [attendanceList, selectedMonth]);

  const onMarkAttendance = (day, studentId, presentStatus) => {
    let date;
    if (selectedMonth && moment(selectedMonth).isValid()) {
      // Construct ISO date for the specific day
      date = moment(selectedMonth).date(day).format("YYYY-MM-DD");
    } else {
      // Fallback: June 2025, but not hardcoded, just for safety
      date = moment({ year: 2025, month: 5, day }).format("YYYY-MM-DD");
    }

    if (presentStatus !== undefined) {
      if (presentStatus === true || presentStatus === "true") {
        const data = {
          day: parseInt(day),
          studentId,
          present: true,
          date
        };
        GlobalApi.MarkAttendance(data)
          .then(res => {
            toast(`Student Id: ${studentId} marked as present for ${day}th of ${date}`);
            if (onAttendanceChanged) onAttendanceChanged();
          })
          .catch(err => {
            const errorMsg = err?.response?.data?.error || "Unknown error";
            console.error("Error marking attendance:", err?.response?.data || err);
            toast.error(`Failed to mark attendance: ${errorMsg}`);
          });
      } else {
        GlobalApi.DeleteAttendance(studentId, parseInt(day), date)
          .then(res => {
            toast(`Student Id: ${studentId} attendance removed for ${day}th of ${date}`);
            if (onAttendanceChanged) onAttendanceChanged();
          })
          .catch(err => {
            const errorMsg = err?.response?.data?.error || "Unknown error";
            console.error("Error deleting attendance:", err?.response?.data || err);
            toast.error(`Failed to delete attendance: ${errorMsg}`);
          });
      }
    }
  };

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
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={(e) => onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelectors={[25, 50, 100, 200]}
        />
      </div>
    </div>
  );
}

export default AttendanceGrid;