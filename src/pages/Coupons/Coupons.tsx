import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import ImagePreviewCell from '@/components/ImagePreviewCell/ImagePreviewCell'
import { Button } from '@/components/ui/button'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, WalletCardsIcon } from 'lucide-react'
import { ActiveStatusCell } from '../Countries/Countries'
import useFetch from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import { DataTable } from '@/components/app/base-table/data-table'
import TableActions from '@/components/TableActions/TableActions'



interface Coupons {
    id: number,
    name: string,
    slug: string,
    code: string,
    type: string,
    reward: string,
    price: string,
    is_active: boolean,
    start_at: string,
    end_at: string,
    discount: string,
    limit_for_user: number
    image: {
        id: number
        media: string
    }
}



const Coupons = () => {

    const columns: ColumnDef<Coupons>[] = [
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
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "code",
            header: "Code"
        },
        {
            accessorKey: "reward",
            header: "Reward"
        },
        {
            accessorKey: "limit_for_user",
            header: "Limit Usage"
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
            accessorKey: 'start_at',
            header: 'Start at',
        },
        {
            accessorKey: 'end_at',
            header: "End at"

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
            cell: ({ row }) => <TableActions to={`/coupons/edit/${row.original.id.toString()}`} />
        }
    ]


    const { data: coupons, loading } = useFetch<Coupons[]>("/dashboard/admin/coupons");
    if (loading) return <Loading />
    const data: Coupons[] = coupons || [];

    return (
        <div className='flex flex-col gap-5'>
            {/* Breadcrumb */}
            <BreadCrumb path='Coupons' icon={WalletCardsIcon} />



            {/* App Table */}
            <DataTable columns={columns} data={data} searchColumnId="name" />

        </div>
    )
}

export default Coupons