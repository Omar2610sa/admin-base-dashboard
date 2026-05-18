// Example.tsx - مثال اختبار مع dummy data
import React, { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import CustomTable from "@/components/app/base-table/CustomTable";




import logo from "@/assets/logoo.png";
import { ArrowUpDown, ContactIcon } from "lucide-react";
import { DataTable } from "@/components/app/base-table/data-table";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import ImagePreviewCell from "@/components/ImagePreviewCell/ImagePreviewCell";
import ShowDialog from "@/components/ShowDialog";
import TableActions from "@/components/TableActions/TableActions";
import Loading from "@/components/Loading";
import useFetch from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";

interface Contacts {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  content: string;
  image: string;
}




export const Contacts = () => {

  const columns: ColumnDef<Contacts>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <ImagePreviewCell
          imageUrl={row.original.image}
        />
      )
    },
    {
      accessorKey: 'full_name',
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
      accessorKey: 'phone',
      header: 'Phone Nubmer'
    },
    {
      accessorKey: 'email',
            header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "content",
      header: "Message",
      cell: ({ row }) => {
        const title = row.original.content
        return (
          <>
            <ShowDialog title={title} />
          </>
        )
      }
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: () => <TableActions />
    }
  ]
  // Featching Data
  const { data: contacts, loading } = useFetch<Contacts[]>("/dashboard/admin/contacts");

  const data: Contacts[] = contacts || [];

  if (loading) return <Loading />

  return (
    <div className="flex flex-col  gap-5">
      {/* Breadcrump */}

      <BreadCrumb path="Contacts" icon={ContactIcon} />


      <DataTable columns={columns} data={data} searchColumnId="full_name" />
    </div>
  );
};

export default Contacts;