import { DataTable } from '@/components/app/base-table/data-table'
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import Loading from '@/components/Loading'
import useFetch from '@/hooks/useFetch'
import type { ColumnDef } from '@tanstack/react-table'
import { Building2Icon } from 'lucide-react'



interface Cities {
    id: number,
    name: string,
    country: {
        name: string,
        short_name: string,
        phone_code: number,
        phone_number_limit: number,
        flag: {
            media: string
        }
    }
}


// Columns Definition 
const columns: ColumnDef<Cities>[] = [
    {
        accessorKey: "name",
        header: "City"
    },
    {
        accessorKey: "country",
        header: "Country",
        cell: ({ row }) => {
            return (
                <span>
                    {
                        row.original.country?.name
                    }
                </span>
            )
        }
    },
    {
        accessorKey: "country",
        header: "Short Name",
        cell: ({ row }) => {
            return (
                <span>
                    {
                        row.original.country?.short_name
                    }
                </span>
            )
        }
    },
    {
        accessorKey: "country",
        header: "Phone Code",
        cell: ({ row }) => {
            return (
                <span>+
                    {row.original.country?.phone_code}
                </span>
            )
        }
    },
    {
        accessorKey: "phone_number_limit",
        header: "Phone Limit",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.country?.phone_number_limit}
                </span>
            )
        }
    },

]

const Cities = () => {

    const { data: cities, loading } = useFetch<Cities[]>("/dashboard/admin/cities");


    if (loading) {
        return <Loading />
    }


    const citiesList = cities?.map((element) => (
        {
            name: element.name,
            phone_code: element.country.phone_code,
            phone_number_limit: element.country.phone_number_limit,
        }
    ))


    const data: Cities[] = cities || []; console.log(data)


    return (
        <div className='flex flex-col'>
            {/* BreadCrumb */}
            <BreadCrumb path='Role' icon={Building2Icon} />

            {/* App table */}
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default Cities