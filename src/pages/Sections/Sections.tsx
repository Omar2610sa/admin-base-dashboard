import AppTable from "@/components/app/base-table/AppTable"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, PanelsTopLeftIcon } from "lucide-react"
const Sections = () => {
    return (
        <div className='flex flex-col gap-6'>
            {/* Breadcrump */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem  className="flex justify-between gap-2 items-center">
                        <Home className="text-foreground w-5 h-5" />
        
                        <BreadcrumbLink className="text-lg text-foreground font-normal" href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem className="flex justify-between gap-2 items-center">
                    <PanelsTopLeftIcon className=" w-5 h-5 text-foreground" />
                        <BreadcrumbPage className="text-lg text-foreground font-semibold ">Sections</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <AppTable />
        </div>
    )
}

export default Sections