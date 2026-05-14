// src/components/CustomTable.tsx
import React, { useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,

    type ColumnDef,
} from "@tanstack/react-table";
import {DataTablePagination} from "@/components/TablePagination";
// import GlobalsIcon from "./Globals/GlobalsIcon";

interface CustomTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    metas?: {
        current_page?: number;
        last_page?: number;
        total?: number;
        per_page?: number;
        from?: number;
        to?: number;
    };
    onPageChange?: (page: number) => void;
    onPerPageChange?: (perPage: number) => void;
}

export const CustomTable = React.forwardRef<
    HTMLDivElement,
    CustomTableProps<any>
>(
    (
        { columns, data, metas, onPageChange, onPerPageChange },
        ref
    ) => {

        const table = useReactTable({
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
        });

        // map column id -> header key للشاشات الصغيرة
        const headerMap = useMemo(() => {
            const map: Record<string, string> = {};
            const groups = table.getHeaderGroups();

            if (groups.length) {
                groups[0].headers.forEach((h) => {
                    const header = h.column.columnDef.header;

                    if (typeof header === "string") {
                        map[h.column.id] = header;
                    }
                });
            }

            return map;
        }, [table]);

        const rows = table.getRowModel().rows;
        const isEmpty = rows.length === 0;

        return (
            <div ref={ref} className="space-y-4">

                {/* جدول سطح المكتب (>= md) */}
                
                <div className="relative z-0 hidden md:block">
                    <div className="rounded-xl drop-shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto overflow-y-visible">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">

                            <thead className="bg-gray-200 dark:bg-gray-800">
                                <tr>
                                    {table
                                        .getHeaderGroups()[0]
                                        ?.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className="px-6 py-4 text-start text-nowrap text-xs font-bold text-gray-800 dark:text-gray-300 uppercase tracking-wider dark:bg-gray-800"
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </th>
                                        ))}
                                </tr>
                            </thead>

                            <tbody
                                className={
                                    !isEmpty
                                        ? "bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
                                        : undefined
                                }
                            >
                                {!isEmpty &&
                                    rows.map((row) => (
                                        <tr
                                            key={row.id}
                                            className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <td
                                                    key={cell.id}
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 relative"
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                            </tbody>

                        </table>
                    </div>

                    {isEmpty && (
                        <div className="w-full flex flex-col gap-4 bg-white dark:bg-gray-900 items-center justify-center min-h-[100px] py-20">
                            {/* <GlobalsIcon name="NoData" /> */}

                            <h3 className="font-medium text-primary uppercase dark:!text-secondary">
                                No Data
                            </h3>
                        </div>
                    )}
                </div>

                {/* قائمة الهاتف (أقل من md) */}
                <div className="space-y-3 md:hidden">

                    {!isEmpty ? (
                        <div className="space-y-3">

                            {rows.map((row) => (
                                <div
                                    key={row.id}
                                    className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <div
                                            key={cell.id}
                                            className="px-4 py-3 flex items-center justify-between gap-3 border-b last:border-b-0 border-gray-100 dark:border-gray-800"
                                        >

                                            {/* التسمية */}
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                {headerMap[cell.column.id] || cell.column.id}
                                            </span>

                                            {/* القيمة */}
                                            <div className="flex-1 text-end">
                                                <div className="text-sm text-gray-900 dark:text-gray-100 truncate">
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            ))}

                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-4 bg-white dark:bg-gray-900 items-center justify-center min-h-60 py-10 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">

                            {/* <GlobalsIcon name="NoData" /> */}

                            <h3 className="font-medium text-primary uppercase dark:!text-secondary text-sm">
                                No Data
                            </h3>

                        </div>
                    )}
                </div>

                {/* الترقيم
                <DataTablePagination
                    currentPage={metas?.current_page ?? 1}
                    totalPages={metas?.last_page ?? 1}
                    totalItems={metas?.total ?? 0}
                    perPage={metas?.per_page ?? 10}
                    from={metas?.from ?? 1}
                    to={metas?.to ?? 1}
                    onPageChange={onPageChange}
                    onPerPageChange={onPerPageChange}
                /> */}

            </div>
        );
    }
);

CustomTable.displayName = "CustomTable";

export default CustomTable;