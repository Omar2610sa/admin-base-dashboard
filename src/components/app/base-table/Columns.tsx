"use client"

import { cn } from "@/lib/utils"
import { type ColumnDef } from "@tanstack/react-table"


import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ArrowUpDown } from "lucide-react"
import ActiveSwitcher from "@/components/ActiveSwitcher"

export type AppTable = {
    id: number,
    title: string,
    description: string,
    status: "active" | "desactive"
}



export const columns: ColumnDef<AppTable>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");

            return (
                // <div 
                //     className={cn(
                //         `p-1 rounded-md w-max text-xs`,
                //         status === "active" && "bg-green-500/40",
                //         status === "desactive" && "bg-red-200 text-red-500"
                //     )}
                // >
                //     {status as string}
                // </div>
                <>
                <ActiveSwitcher />
                </>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent >
                        <DropdownMenuLabel className="flex items-center text-xs justify-center">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center">Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" className=" p-1 justify-center"
                            onClick={() => navigator.clipboard.writeText(payment.id.toString())}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]