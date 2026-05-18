import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import ImagePreviewCell from '@/components/ImagePreviewCell/ImagePreviewCell'
import { Button } from '@/components/ui/button'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, UsersIcon } from 'lucide-react'
import React, { useState } from 'react'
import { ActiveStatusCell } from '../Countries/Countries'
import TableActions from '@/components/TableActions/TableActions'
import Loading from '@/components/Loading'
import useFetch from '@/hooks/useFetch'
import { DataTable } from '@/components/app/base-table/data-table'

interface Users {
    id: number
    full_name: string
    image: {
        id: number
        media: string
    }
    email: string
    phone: string
    phone_code: string
    is_admin_active_user: boolean
    is_ban: boolean

}

export const BanStatusCell = ({ isActive }: { isActive: boolean }) => {
    const [isChecked, setIsChecked] = useState(isActive)

    return (
        <div className='flex justify-center gap-6 items-center'>


            <div className={` ${isChecked ? "bg-red-700/80" : "bg-gray-700/80"} text-white  rounded-2xl`}>
                <div className={`py-1 px-2.5`} >
                    {isChecked ? 'Ban' : 'Not Ban'}
                </div>
            </div>
        </div>
    )
}

const Users = () => {

    const columns: ColumnDef<Users>[] = [
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
            accessorKey: "full_name",
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
            accessorKey: "email",
            header: "Email"
        },
        {
            accessorKey: "phone",
            header: "Phone"
        },
        {
            accessorKey: "phone_code",
            header: "Phone Code",
            cell: ({ row }) => (
                <span>+{row.original.phone_code}</span>
            )
        },
        {
            accessorKey: 'is_admin_active_user',
            header: "Status",
            cell: ({ row }) => {
                return (

                    <ActiveStatusCell isActive={row.original.is_admin_active_user} />
                )
            }
        },
        {
            accessorKey: 'is_ban',
            header: "Ban",
            cell: ({ row }) => {
                return (

                    <BanStatusCell isActive={row.original.is_ban} />
                )
            }
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => <TableActions to={`/sliders/edit/${row.original.id.toString()}`} />
        }
    ]

    const { data: users, loading } = useFetch<Users[]>("/dashboard/admin/users");
    if (loading) return <Loading />
    const data: Users[] = users || [];
    return (
        <div className='flex flex-col gap-5'>
            {/* Breadcrumb */}
            <BreadCrumb path='Users' icon={UsersIcon} />

            {/* App Table */}
            <DataTable columns={columns} data={data} searchColumnId="full_name" />

        </div>
    )
}

export default Users