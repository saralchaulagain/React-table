"use client";
import DATA from "@/data";
import { Box } from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import EditableCell from "./editableCell";

type Status = {
  id: number;
  name: string;
  color: string;
};
type Task = {
  task: string;
  status: Status | null;
  due: Date | null;
  notes: string;
};

const columns: ColumnDef<Task>[] = [
  {
    size: 210,
    minSize: 230,
    maxSize: 300,
    accessorKey: "task",
    header: "Task",
    cell: EditableCell,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    minSize: 100,
    maxSize: 200,
    cell: (props) => {
      const status = props.getValue() as Status | null;
      const statusName = status?.name ?? "No Status";
      return <p>{statusName}</p>;
    },
  },
  {
    accessorKey: "due",
    header: "Due",
    minSize: 170,
    maxSize: 250,
    size: 190,
    cell: EditableCell,
  },
  {
    minSize: 215,
    maxSize: 300,
    accessorKey: "notes",
    header: "Notes",
    size: 245,
    cell: EditableCell,
  },
];

const Page = () => {
  const [data, setData] = useState<Task[]>(DATA);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
  });
  console.log(data);
  return (
    <Box sx={{ padding: "16px", display: "flex", justifyContent: "center" }}>
      <table
        style={{
          borderCollapse: "collapse",
          border: "1px solid #ccc",
          width: `${table.getTotalSize()}px`,
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} style={{ borderBottom: "1px solid #ccc" }}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{
                    borderRight: "1px solid #ddd",
                    padding: "8px",
                    width: `${header.getSize()}px`,
                    textAlign: "left",
                  }}
                >
                  <div className="h-8 flex justify-between items-center relative">
                    <span>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                    <div
                      onMouseDown={header.getResizeHandler()}
                      className="h-full w-[8px] bg-[#ff2727] opacity-0 hover:opacity-90 absolute right-0 top-0
                  "
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} style={{ borderBottom: "1px solid #eee" }}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    borderRight: "1px solid #f0f0f0",
                    padding: "8px",
                    width: `${cell.column.getSize()}px`,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default Page;
