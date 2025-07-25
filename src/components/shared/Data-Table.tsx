import { PaginationLogic } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { BaseSelect } from "../plugin";

interface IDataTableProps {
  pagination?: boolean;
  page: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onChangePage?: (page: number, pageSize: number) => void;
  items?: Array<Record<string, any>>;
  columns: { key: string; label: string }[]; // Columns for the table
}
export default function DataTable({
  pagination = false,
  page,
  pageSize,
  pageSizeOptions = [5, 10, 20, 50],
  onChangePage,
  items = [], // Default to products if no items provided
  columns = [],
}: IDataTableProps) {
  return (
    <div className="mx-5 my-2">
      {pagination && (
        <BaseSelect
          className="max-w-20 mb-4"
          options={pageSizeOptions.map((size) => ({
            value: size.toString(),
            label: size.toString(),
          }))}
          onChange={(value) => {
            const newSize = parseInt(value, 10);
            if (newSize !== pageSize) {
              if (onChangePage) {
                onChangePage(1, newSize);
              }
            }
          }}
          value={pageSize.toString()}
        />
      )}
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((product) => (
              <TableRow key={product.id} className="odd:bg-muted/50">
                <TableCell className="pl-4">{product.id}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <PaginationLogic
          currentPage={page}
          totalPages={10}
          onPageChange={(onPage) => {
            if (onChangePage) {
              onChangePage(onPage, pageSize);
            }
          }}
        />
      )}
    </div>
  );
}
