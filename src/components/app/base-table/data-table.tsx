"use client"

import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    type SortingState,
    getSortedRowModel,
    type ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
import { DataTablePagination } from "@/components/TablePagination"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { PlusCircle, SearchXIcon } from "lucide-react"
import FiltersBtns from "@/components/FiltersBtns/FiltersBtns"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    searchColumnId?: string
    nameAdd?: string
    addPath?: string
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchColumnId,
    nameAdd,
    addPath
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        },
    })

    const navigate = useNavigate();
    return (
        <div>
            <div className="flex items-center justify-between">

                {/* Filters */}
                {searchColumnId && (
                    <FiltersBtns table={table} columnId={searchColumnId} />
                )}
                {/* Add Button */}
                <Button
                    onClick={() => addPath && navigate(addPath)}
                    className="bg-sidebar-accent text-white p-4 ">
                    <PlusCircle /> Add {nameAdd}
                </Button>
            </div>
            <div className="overflow-hidden rounded-md border">



                {/* Table */}
                <Table className=" text-center ">
                    <TableHeader >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="text-sidebar-accent  text-center " key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className=" py-5 px-3 " key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    <SearchXIcon className="mx-auto h-20 w-20 my-20" />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>

            </div>
            <div className="mt-3">

                <DataTablePagination table={table} />
            </div>
        </div>
    )
}