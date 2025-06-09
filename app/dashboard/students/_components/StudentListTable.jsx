"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Search, TrashIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

ModuleRegistry.registerModules([AllCommunityModule]);

function StudentListTable({ studentList = [], loading, onDeleteStudent, deletingId }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [rowData, setRowData] = useState([]);

  const [searchInput, setSearchInput] = useState();

  const CustomButton = (props) => {
    const studentId = props.data?.id;
    const isDeleting = deletingId === studentId;
    return (
      <div className="flex justify-center items-center h-full">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="bg-red-500 hover:bg-red-700 text-white px-2.5 py-1.5 text-sm h-[35px] cursor-pointer"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="flex items-center"><svg className="animate-spin h-4 w-4 mr-1 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Deleting...</span>
              ) : (
                <><TrashIcon className="w-3.5 h-3.5 mr-1" />Delete</>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this student and remove their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
              <AlertDialogAction className="cursor-pointer" onClick={() => onDeleteStudent(studentId)} disabled={isDeleting}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };

  const [colDefs] = useState([
    { 
      field: "id", 
      filter: true,
      width: 80,
      minWidth: 60,
      cellStyle: { fontSize: '0.875rem' }
    },
    { 
      field: "name", 
      filter: true,
      flex: 2,
      minWidth: 150,
      cellStyle: { fontSize: '0.875rem' }
    },
    { 
      field: "year", 
      filter: true,
      width: 100,
      minWidth: 80,
      cellStyle: { fontSize: '0.875rem' }
    },
    { 
      field: "division", 
      headerName: "Div", 
      filter: true,
      width: 80,
      minWidth: 60,
      cellStyle: { fontSize: '0.875rem' }
    },
    { 
      field: "action", 
      cellRenderer: CustomButton,
      width: 120,
      minWidth: 100,
      suppressSizeToFit: true
    },
  ]);
  const defaultColDef = {
    flex: 1,
    minWidth: 80,
    resizable: true,
    sortable: true,
    filter: true,
    suppressSizeToFit: false,
    cellStyle: { 
      padding: '8px 12px',
      fontSize: '0.875rem'
    }
  };

  useEffect(() => {
    setMounted(true);
    if (studentList.length > 0) {
      setRowData(studentList);
    }
  }, [studentList]);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const gridTheme = "ag-theme-alpine";
  const themeMode = currentTheme === "dark" ? "dark" : "light";

  return (    <div
      className={`${gridTheme} rounded-2xl p-3 sm:p-6 w-full min-h-[400px] sm:min-h-[600px] overflow-auto bg-black`}
      data-ag-theme-mode={themeMode}
    >
      <style>{`
        .ag-theme-alpine, .ag-theme-alpine-dark {
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
          font-size: 0.875rem;
          border-radius: 0.75rem 0.75rem 0 0;
        }
        .ag-row {
          background: #000 !important;
          color: #fff !important;
          font-size: 0.875rem;
          transition: background 0.2s;
        }
        .ag-row-hover {
          background: #18181b !important;
        }
        .ag-cell {
          background: #000 !important;
          color: #fff !important;
          padding: 0.5rem 0.75rem !important;
          border: none !important;
          font-size: 0.875rem !important;
        }
        .ag-header-cell {
          border: none !important;
          padding: 0.75rem 0.75rem !important;
        }
        .ag-row-selected {
          background: #222 !important;
          color: #fff !important;
        }
        .ag-header-cell-label {
          color: #fff !important;
        }
        .ag-paging-panel {
          background: #18181b !important;
          color: #fff !important;
          border-radius: 0 0 0.75rem 0.75rem;
        }
        
        /* Mobile responsive styles */
        @media (max-width: 640px) {
          .ag-header {
            font-size: 0.75rem;
          }
          .ag-cell {
            padding: 0.375rem 0.5rem !important;
            font-size: 0.75rem !important;
          }
          .ag-header-cell {
            padding: 0.5rem 0.5rem !important;
          }
          .ag-row {
            font-size: 0.75rem;
          }
        }
      `}</style>

      {/* Search Bar */}
      <div className="relative max-w-xs w-full mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-[#18181b] border border-[#232326] text-white placeholder:text-gray-400 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#333]"
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="ag-grid-container overflow-x-auto">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          domLayout="autoHeight"
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelectors={[25, 50, 100, 200]}
          rowHeight={48}
          quickFilterText={searchInput}
          suppressHorizontalScroll={false}
          maintainColumnOrder={true}
        />
      </div>
    </div>
  );
}

export default StudentListTable;
