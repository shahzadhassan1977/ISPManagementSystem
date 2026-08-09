"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ViewModal from "@/components/ui/ViewModal";

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  loading?: boolean;
};

export default function DataTable<T>({
  data,
  columns,
  loading = false,
}: DataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: data || [],
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // ✅ EXPORT DATA (filtered rows)
  const exportData = table.getFilteredRowModel().rows.map((row) => row.original);

  // 📄 CSV EXPORT
  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data.csv");
  };

  // 📊 EXCEL EXPORT
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "data.xlsx");
  };

  return (
    <div className="bg-white dark:bg-slate-950 p-4 rounded-xl shadow space-y-4 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700">

      {/* 🔍 SEARCH + EXPORT */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="border px-3 py-2 rounded w-full md:w-64 bg-slate-50 text-slate-900 border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700"
        />

        <div className="space-x-2">
          <button
            onClick={exportCSV}
            className="px-3 py-1 border rounded bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
          >
            Export CSV
          </button>

          <button
            onClick={exportExcel}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Export Excel
          </button>
        </div>

      </div>

      {/* 📊 TABLE */}
      <table className="w-full border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">

        <thead className="bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 text-left cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                No data found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-200 dark:border-slate-700">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

      </table>

      {/* 📄 PAGINATION */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-slate-900 dark:text-slate-100">

        <div className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>

        <div className="space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
          >
            Prev
          </button>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}