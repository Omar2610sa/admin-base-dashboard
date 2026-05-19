import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import ImagePreviewCell from '@/components/ImagePreviewCell/ImagePreviewCell'
import type { ColumnDef } from '@tanstack/react-table'
import { SaudiRiyal, ShoppingBasketIcon } from 'lucide-react'
import { ActiveStatusCell } from '../Countries/Countries'
import { useState } from 'react'
import Loading from '@/components/Loading'
import useFetch from '@/hooks/useFetch'
import { DataTable } from '@/components/app/base-table/data-table'


interface Orders {
    id: number
    order_number: string
    status: string
    seller: {
        image: string
    }
    customer: {
        original_paid: number
        final_paid: number
    }
}

const Orders = () => {

    const columns: ColumnDef<Orders>[] = [
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => (
                <ImagePreviewCell
                    imageUrl={row.original.seller.image}
                />
            )
        },
        {
            accessorKey: "order_number",
            header: "Order Number"
        },
        {
            accessorKey: "customer.original_paid",
            header: "Total Cashe",
            cell: ({ row }) => (
                <span>
                    {row.original.customer.original_paid} SAR
                </span>
            )
        },
        // {
        //     accessorKey: 'status',
        //     header: "Status",
        //     cell: ({ row }) => {

        //         return (
        //             <div className='flex justify-center gap-6 items-center'>


        //                 <div className={` ${isChecked ? "bg-green-700/80" : "bg-red-700/80"} text-white  rounded-2xl`}>
        //                     <div className={`py-1 px-2.5`} >
        //                         {isChecked ? 'Active' : 'Desactive'}
        //                     </div>
        //                 </div>
        //             </div>
        //         )
        //     }
        // },
    ]


    // Fetching Data
    const { data: orders, loading } = useFetch<Orders[]>("/dashboard/admin/orders");
    if (loading) return <Loading />
    const data: Orders[] = orders || [];


    return (
        <div className='flex flex-col gap-5'>
            {/* Breadcrumb */}
            <BreadCrumb path='Orders' icon={ShoppingBasketIcon} />


            {/* App Table */}

                <DataTable columns={columns} data={data} searchColumnId="title" />
        </div>
    )
}

export default Orders