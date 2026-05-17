
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb"
import type { ColumnDef } from "@tanstack/react-table"

import { ArrowUpDown, Sliders } from "lucide-react"
import { ActiveStatusCell } from "../Countries/Countries"
import ShowDialog from "@/components/ShowDialog"
import TableActions from "@/components/TableActions/TableActions"
import useFetch from "@/hooks/useFetch"
import Loading from "@/components/Loading"
import { DataTable } from "@/components/app/base-table/data-table"
import { Button } from "@/components/ui/button"


interface Slider {
    id: number,
    title: string,
    description: string,
    discount: number,
    type: string,
    is_active: boolean,
    start_at: string,
    end_at: string,
    image: {
        id: number
        media: string
    }
}


const columns: ColumnDef<Slider>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {

            const imageUrl = row.original.image.media
            return (
                <>
                    <img
                        src={imageUrl}
                        className="size-14  rounded-full mx-auto bg-slate-100 object-contain"
                    />
                </>
            )
        }
    },
    {
        accessorKey: "title",
        header: "Title",
    },

    {
        accessorKey: "discount",
        header: 'Discount',
        cell: ({ row }) => {
            return (
                <span>
                    %{
                        row.original.discount
                    }
                </span>
            )
        }
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const title = row.original.description
            return (
                <>
                    <ShowDialog title={title} />
                </>
            )
        }
    },
    {
        accessorKey: 'start_at',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Start At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

    },
    {
        accessorKey: 'end_at',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    End At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

    },
    {
        accessorKey: 'is_active',
        header: "Status",
        cell: ({ row }) => {
            return (

                <ActiveStatusCell isActive={row.original.is_active} />
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: () => <TableActions />
    }
]

const Slider = () => {
    const { data: slider, loading } = useFetch<Slider[]>("/dashboard/admin/sliders");
    if (loading) return <Loading />
    const data: Slider[] = slider || [];


    return (
        <div className='flex flex-col '>
            {/* BreadCrumb */}
            <BreadCrumb path="Contacts" icon={Sliders} />

            {/* App Table */}
            <DataTable columns={columns} data={data} />

        </div>
    )
}

export default Slider