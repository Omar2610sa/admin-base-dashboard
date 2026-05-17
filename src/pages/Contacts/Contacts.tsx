// Example.tsx - مثال اختبار مع dummy data
import React, { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import CustomTable from "@/components/app/base-table/CustomTable";




import logo from "@/assets/logoo.png"; 
import { ContactIcon, DeleteIcon, EditIcon, Home, PlusCircleIcon } from "lucide-react";
import { DataTable } from "@/components/app/base-table/data-table";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";

interface Company {
  id: number;
  index: number;
  name: string;
  image: string;
  created_at: string;
  business_field: string;
  commercial_registration: string;
  is_ban: boolean;
}

// Dummy Data
const dummyData: Company[] = [
  {
    id: 1,
    index: 0,
    name: "Tech Solutions LLC",
    image: logo,
    created_at: "2024-01-15",
    business_field: "Software Development",
    commercial_registration: "CR-2024-001",
    is_ban: false,
  },
  {
    id: 1,
    index: 0,
    name: "Tech Solutions LLC",
    image: logo,
    created_at: "2024-01-15",
    business_field: "Software Development",
    commercial_registration: "CR-2024-001",
    is_ban: false,
  },
  {
    id: 1,
    index: 0,
    name: "Tech Solutions LLC",
    image: logo,
    created_at: "2024-01-15",
    business_field: "Software Development",
    commercial_registration: "CR-2024-001",
    is_ban: false,
  },
  {
    id: 1,
    index: 0,
    name: "Tech Solutions LLC",
    image: logo,
    created_at: "2024-01-15",
    business_field: "Software Development",
    commercial_registration: "CR-2024-001",
    is_ban: false,
  },
  {
    id: 1,
    index: 0,
    name: "Tech Solutions LLC",
    image: logo,
    created_at: "2024-01-15",
    business_field: "Software Development",
    commercial_registration: "CR-2024-001",
    is_ban: false,
  },
  {
    id: 1,
    index: 0,
    name: "Tech Solutions LLC",
    image: logo,
    created_at: "2024-01-15",
    business_field: "Software Development",
    commercial_registration: "CR-2024-001",
    is_ban: false,
  },
  {
    id: 1,
    index: 0,
    name: "Tech Solutions LLC",
    image: logo,
    created_at: "2024-01-15",
    business_field: "Software Development",
    commercial_registration: "CR-2024-001",
    is_ban: false,
  },
  {
    id: 1,
    index: 0,
    name: "Tech Solutions LLC",
    image: logo,
    created_at: "2024-01-15",
    business_field: "Software Development",
    commercial_registration: "CR-2024-001",
    is_ban: false,
  },
  {
    id: 1,
    index: 0,
    name: "Tech Solutions LLC",
    image: logo,
    created_at: "2024-01-15",
    business_field: "Software Development",
    commercial_registration: "CR-2024-001",
    is_ban: false,
  },
  {
    id: 1,
    index: 0,
    name: "Tech Solutions LLC",
    image: logo,
    created_at: "2024-01-15",
    business_field: "Software Development",
    commercial_registration: "CR-2024-001",
    is_ban: false,
  },
  {
    id: 2,
    index: 1,
    name: "Digital Marketing Pro",
    image: logo,
    created_at: "2024-02-20",
    business_field: "Marketing & Advertising",
    commercial_registration: "CR-2024-002",
    is_ban: false,
  },
  {
    id: 3,
    index: 2,
    name: "Design Studio",
    image: logo,
    created_at: "2024-03-10",
    business_field: "Graphic Design",
    commercial_registration: "CR-2024-003",
    is_ban: true,
  },
  {
    id: 4,
    index: 3,
    name: "Web Hosting Services",
    image: logo,
    created_at: "2024-04-05",
    business_field: "IT Infrastructure",
    commercial_registration: "CR-2024-004",
    is_ban: false,
  },
];

// Columns Definition
const columns: ColumnDef<Company>[] = [
  // {
  //   accessorKey: "id",
  //   header: "Id",
  // },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue<string>("image");
      return (
        <img
          src={imageUrl}
          alt={`Company ${row.getValue<string>("name")}`}
          className="size-12 p-1 rounded-full bg-slate-100 object-contain"
        />
      );
    }
  },
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "created_at",
    header: "Created Date",
  },
  {
    accessorKey: "business_field",
    header: "Business Field",
  },
  {
    accessorKey: "commercial_registration",
    header: "Registration",
  },
  {
    accessorKey: "is_ban",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end sm:justify-start gap-2">
          <button
            onClick={() => alert(`View: ${row.original.id}`)}
            className=" text-blue-500  rounded hover:text-blue-600 "
          >
            <PlusCircleIcon width={20} height={20} />
          </button>
          <button
            onClick={() => alert(`Edit: ${row.original.id}`)}
            className=" text-yellow-500  rounded hover:text-yellow-600 "
          >
            <EditIcon width={20} height={20} />
          </button>
          <button
            onClick={() => alert(`Delete: ${row.original.id}`)}
            className=" text-red-500  rounded hover:text-red-600 "
          >
            <DeleteIcon width={20} height={20} />
          </button>
        </div>
      )
    }, // سيتم التعامل معها في renderCell
  },
];

export const Contacts = () => {
  const [data, setData] = useState<Company[]>(dummyData);

  const renderCell = (cell: any) => {
    const columnId = cell.column.id;
    const rowData = cell.row.original;

    // Index
    if (columnId === "index") {
      return (
        <span className="font-bold text-blue-600">
          # {cell.row.index + 1}
        </span>
      );
    }

    // Name مع الصورة
    // if (columnId === "name") {
    //   return (
    //     <div className="flex items-center justify-end sm:justify-start gap-2">
    //       <img
    //         src={rowData?.image}
    //         alt={rowData?.name}
    //         className="size-12 rounded-full object-cover"
    //       />
    //       <div>
    //         {rowData?.name || <span className="text-gray-500 italic">No Data</span>}
    //       </div>
    //     </div>
    //   );
    // }

    // Created At
 
    // Business Field
    if (columnId === "business_field") {
      return <div>{rowData?.business_field || "No Data"}</div>;
    }

    // Commercial Registration
    if (columnId === "commercial_registration") {
      return <div >{rowData?.commercial_registration || "No Data"}</div>;
    }



    // Actions
    if (columnId === "actions") {
      return (
        <div className="flex items-center justify-end sm:justify-start gap-2">
          <button
            onClick={() => alert(`View: ${rowData.id}`)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            View
          </button>
          <button
            onClick={() => alert(`Edit: ${rowData.id}`)}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setData(data.filter((item) => item.id !== rowData.id));
            }}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      );
    }

    // Default
    return <span>{cell.getValue()}</span>;
  };

  return (
    <div className="flex flex-col  max-w-dvw">
      {/* Breadcrump */}
      
      <BreadCrumb path="Contacts" icon={ContactIcon} />

      {/* <CustomTable
        columns={columns}
        data={data}
        metas={{
          current_page: 1,
          last_page: 1,
          total: data.length,
          per_page: 10,
          from: 1,
          to: data.length,
        }}
        renderCell={renderCell}
      /> */}

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Contacts;