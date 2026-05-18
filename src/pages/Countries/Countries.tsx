import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { Flag } from 'lucide-react'

import { type ColumnDef } from "@tanstack/react-table";

import useFetch from "@/hooks/useFetch"
import { useState } from 'react';
import { DataTable } from '@/components/app/base-table/data-table';
import Loading from '@/components/Loading';
import TableActions from '@/components/TableActions/TableActions';
import ActiveSwitcher from '@/components/ActiveSwitcher';

interface Countries {
    id: number;
    is_active: boolean;
    name: string;
    code: number;
    phone_code: number;
    phone_number_limit: string;
    flag: {
        id: number;
        media: string;
    };
}

export const ActiveStatusCell = ({ isActive }: { isActive: boolean }) => {
    const [isChecked, setIsChecked] = useState(isActive)

    return (
        <div className='flex justify-center gap-6 items-center'>


            <div className={` ${isChecked? "bg-green-700/80": "bg-red-700/80"} text-white  rounded-2xl`}>
                <div className={`py-1 px-2.5`} >
                    {isChecked ? 'Active' : 'Desactive'}
                </div>
            </div>
        </div>
    )
}

const Countries = () => {
    const columns: ColumnDef<Countries>[] = [
        {
            accessorKey: "flag",
            header: "Flag",
            cell: ({ row }) => {
                const imageUrl = row.original.flag?.media;
                return (
                    <img
                        src={imageUrl}
                        alt={row.original.name}
                        className="size-12 p-1 rounded-full mx-auto bg-slate-100 object-contain"
                    />
                );
            }
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "phone_code",
            header: "Phone Code",
            cell: ({ row }) => (
                <span>+{row.original.phone_code}</span>
            )
        },
        {
            accessorKey: "phone_number_limit",
            header: "Phone Length",
        },
        {
            accessorKey: "is_active",
            header: "Status",
            cell: ({ row }) => (
                <ActiveStatusCell isActive={row.original.is_active} />
            )
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: () => <TableActions />
        }
    ]

    const { data: countries, loading } = useFetch<Countries[]>("/dashboard/admin/countries");

    if (loading) {
        return <Loading />
    }

    const data: Countries[] = countries || [];

    return (
        <div className='flex flex-col'>
            {/* Breadcrumb */}
            <BreadCrumb path='Countries' icon={Flag} />
            
            {/* App table */}
            <DataTable columns={columns} data={data} searchColumnId='name' />
        </div>
    )
}

export default Countries