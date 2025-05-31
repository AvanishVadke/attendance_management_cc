"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Search, TrashIcon } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

function StudentListTable({ studentList = [] }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [rowData, setRowData] = useState([]);

  const [searchInput, setSearchInput] = useState();

  const CustomButton = () => (
  <div className="flex justify-center items-center h-full">
    <Button
      className="bg-red-500 hover:bg-red-700 text-white px-2.5 py-1.5 text-sm h-[35px] cursor-pointer"
    >
      <TrashIcon className="w-3.5 h-3.5 mr-1" />
      Delete
    </Button>
  </div>
);


  const [colDefs] = useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "year", filter: true },
    { field: "division", headerName: "Div", filter: true },
    { field: "action", cellRenderer: CustomButton },
  ]);

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true,
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

  return (
    <div
      className={`${gridTheme} rounded-2xl p-6 w-full min-h-[600px] overflow-auto bg-black`}
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
          font-size: 1rem;
          border-radius: 0.75rem 0.75rem 0 0;
        }
        .ag-row {
          background: #000 !important;
          color: #fff !important;
          font-size: 0.95rem;
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
        }
        .ag-header-cell {
          border: none !important;
          padding: 1rem 1rem !important;
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
      `}</style>

      {/* Search Bar */}
      <div className="relative max-w-xs w-full mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-[#18181b] border border-[#232326] text-white placeholder:text-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#333]"
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="ag-grid-container">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          domLayout="autoHeight"
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelectors={[25, 50, 100, 200]}
          rowHeight={56}
          quickFilterText={searchInput}
        />
      </div>
    </div>
  );
}

export default StudentListTable;
