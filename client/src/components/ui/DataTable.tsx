"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  Download,
  FileSpreadsheet,
  Search,
} from "lucide-react";

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  loading?: boolean;
  error?: unknown;
  onRetry?: () => void;
};

export default function DataTable<T>({ data, columns, loading = false, error, onRetry }: DataTableProps<T>) {
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

  const exportData = table.getFilteredRowModel().rows.map((row) => row.original);
  const filteredCount = table.getFilteredRowModel().rows.length;
  const pageRows = table.getRowModel().rows;
  const pageCount = Math.max(table.getPageCount(), 1);
  const currentPage = table.getState().pagination.pageIndex + 1;
  const hasError = Boolean(error);

  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    saveAs(new Blob([csv], { type: "text/csv;charset=utf-8;" }), "data.csv");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Records");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      "data.xlsx",
    );
  };

  const sortIcon = (sorted: false | "asc" | "desc") => {
    if (sorted === "asc") return <ChevronUp size={13} aria-hidden="true" />;
    if (sorted === "desc") return <ChevronDown size={13} aria-hidden="true" />;
    return <ChevronsUpDown size={13} aria-hidden="true" />;
  };

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-3 text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-sm">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="Search records"
            aria-label="Search all records"
            className="min-h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2468bd] focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-950"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <p className="mr-auto text-xs text-slate-500 dark:text-slate-400 lg:mr-2">
            {filteredCount.toLocaleString()} {filteredCount === 1 ? "record" : "records"}
          </p>
          <button
            type="button"
            onClick={exportCSV}
            disabled={exportData.length === 0}
            className="inline-flex min-h-9 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Download size={14} aria-hidden="true" /> CSV
          </button>
          <button
            type="button"
            onClick={exportExcel}
            disabled={exportData.length === 0}
            className="inline-flex min-h-9 items-center gap-2 rounded-md bg-[#142e5c] px-3 text-xs font-semibold text-white transition hover:bg-[#1d447d] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            <FileSpreadsheet size={14} aria-hidden="true" /> Excel
          </button>
        </div>
      </div>

      {hasError ? (
        <div role="alert" className="rounded-md border border-amber-200 bg-amber-50 px-4 py-8 text-center dark:border-amber-900/70 dark:bg-amber-950/30">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Records couldn&apos;t be loaded</p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Check your connection and try again.</p>
          {onRetry && (
            <button type="button" onClick={onRetry} className="mt-4 min-h-9 rounded-md bg-[#142e5c] px-4 text-xs font-semibold text-white transition hover:bg-[#1d447d] dark:bg-blue-700 dark:hover:bg-blue-600">
              Try again
            </button>
          )}
        </div>
      ) : <>
      <div className="hidden overflow-x-auto rounded-md border border-slate-200 dark:border-slate-700 md:block">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} scope="col" className="whitespace-nowrap px-3 py-3 font-bold">
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="inline-flex items-center gap-1.5 rounded text-left transition hover:text-[#245fae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        aria-label={`Sort by ${String(header.column.columnDef.header ?? header.column.id)}`}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sortIcon(header.column.getIsSorted())}
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-slate-500">Loading records…</td></tr>
            ) : pageRows.length === 0 ? (
              <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-slate-500">{globalFilter ? "No records match your search." : "No records available yet."}</td></tr>
            ) : (
              pageRows.map((row) => (
                <tr key={row.id} className="transition hover:bg-slate-50/80 dark:hover:bg-slate-900/70">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="max-w-[360px] px-3 py-3 align-middle text-xs text-slate-700 dark:text-slate-200">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="space-y-2 md:hidden">
        {loading ? (
          <div className="rounded-md border border-slate-200 px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-700">Loading records…</div>
        ) : pageRows.length === 0 ? (
          <div className="rounded-md border border-slate-200 px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-700">{globalFilter ? "No records match your search." : "No records available yet."}</div>
        ) : (
          pageRows.map((row) => {
            const cells = row.getVisibleCells();
            const actionCell = cells.find((cell) => cell.column.id === "actions");
            const detailCells = cells.filter((cell) => cell.column.id !== "actions").slice(1);
            const titleCell = cells.find((cell) => cell.column.id !== "actions");

            return (
              <article key={row.id} className="rounded-md border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="min-w-0 flex-1 truncate text-sm font-semibold text-[#142e5c] dark:text-blue-100">
                    {titleCell ? flexRender(titleCell.column.columnDef.cell, titleCell.getContext()) : "Record"}
                  </h3>
                  {actionCell && <div className="shrink-0">{flexRender(actionCell.column.columnDef.cell, actionCell.getContext())}</div>}
                </div>
                {detailCells.length > 0 && (
                  <dl className="mt-3 grid grid-cols-1 gap-2 border-t border-slate-100 pt-3 dark:border-slate-800 sm:grid-cols-2">
                    {detailCells.map((cell) => {
                      const heading = cell.column.columnDef.header;
                      const label = typeof heading === "string" ? heading : cell.column.id.replaceAll(".", " ");
                      return (
                        <div key={cell.id} className="min-w-0">
                          <dt className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
                          <dd className="mt-0.5 truncate text-xs text-slate-700 dark:text-slate-200">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                )}
              </article>
            );
          })
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 pt-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Rows</span>
          <select
            aria-label="Rows per page"
            value={table.getState().pagination.pageSize}
            onChange={(event) => table.setPageSize(Number(event.target.value))}
            className="h-8 rounded border border-slate-300 bg-white px-2 text-xs text-slate-700 outline-none focus:border-[#2468bd] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {[10, 20, 50, 100].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
          <span className="ml-1">Page {currentPage} of {pageCount}</span>
        </div>
        <div className="flex items-center justify-between gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
            className="grid h-9 w-9 place-items-center rounded-md border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
            className="grid h-9 w-9 place-items-center rounded-md border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
      </>}
    </section>
  );
}