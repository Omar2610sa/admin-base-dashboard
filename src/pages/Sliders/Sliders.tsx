
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
import ImagePreviewCell from "@/components/ImagePreviewCell/ImagePreviewCell"


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
        cell: ({ row }) => (
            <ImagePreviewCell
                imageUrl={row.original.image.media}
            />
        )
    },
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
        accessorKey: "discount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Discount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
        header: 'Start',
    },
    {
        accessorKey: 'end_at',
        header: "End"

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
        cell: ({ row }) => (
            <TableActions
                to={`/sliders/edit/${row.original.id.toString()}`}
                itemId={row.original.id}
                itemName={row.original.title || "Slider"}
                endpoint="/dashboard/admin/sliders"
                onDeleteSuccess={() => {
                    // Trigger table refresh - depends on your implementation
                    // e.g., refetch data, invalidate query, etc.
                    console.log("Slider deleted, refresh table")
                }}
            />
        )
    }
]

const Slider = () => {
    const { data: slider, loading } = useFetch<Slider[]>("/dashboard/admin/sliders");
    if (loading) return <Loading />
    const data: Slider[] = slider || [];


    return (
        <div className='flex flex-col gap-5 '>
            {/* BreadCrumb */}
            <BreadCrumb path="Sliders" icon={Sliders} />

            {/* App Table */}
            <div>

                <DataTable columns={columns}
                    data={data}
                    searchColumnId="title"
                    nameAdd="Slider"
                    addPath="/sliders/add" />
            </div>

        </div>
    )
}

export default Slider