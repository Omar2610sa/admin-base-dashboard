import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import type { ColumnDef } from '@tanstack/react-table'
import { BadgeQuestionMark } from 'lucide-react'
import React from 'react'
import { ActiveStatusCell } from '../Countries/Countries'
import Loading from '@/components/Loading'
import useFetch from '@/hooks/useFetch'
import { DataTable } from '@/components/app/base-table/data-table'
import TableActions from '@/components/TableActions/TableActions'

interface Faqs {
    id: number
    is_active: boolean
    question: string
    answer: string
}

const Faqs = () => {

    const columns: ColumnDef<Faqs>[] = [
        {
            accessorKey: 'id',
            header: "Id"
        },
        {
            accessorKey: 'question',
            header: "Question"
        },
        {
            accessorKey: 'answer',
            header: "Answer"
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
            cell: ({ row }) => <TableActions to={`/sliders/edit/${row.original.id.toString()}`} />
        }
    ]

    // Fetching Data
    const { data: coupons, loading } = useFetch<Faqs[]>("/dashboard/admin/faqs");
    if (loading) return <Loading />
    const data: Faqs[] = coupons || [];


    return (
        <div className='flex flex-col gap-5'>
            {/* Breadcrumb */}
            <BreadCrumb path='FAQ' icon={BadgeQuestionMark} />

            {/* App Table */}
            <DataTable columns={columns} data={data} searchColumnId="question" />
        </div>
    )
}

export default Faqs