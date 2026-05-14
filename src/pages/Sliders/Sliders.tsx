
import  AppTable from "@/components/app/base-table/AppTable"
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, PanelsTopLeftIcon, Sliders } from "lucide-react"
const Sections = () => {
    return (
        <div className='flex flex-col '>
            {/* Breadcrump */}
            {/* <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem  className="flex justify-between gap-2 items-center">
                        <Home className="text-foreground w-5 h-5" />
        
                        <BreadcrumbLink className="text-lg text-foreground font-light" href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem className="flex justify-between gap-2 items-center">
                    <PanelsTopLeftIcon className=" w-5 h-5 text-foreground" />
                        <BreadcrumbPage className="text-lg text-foreground font-medium ">Sliders</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb> */}
      <BreadCrumb path="Contacts" icon={Sliders} />


            <AppTable />
        </div>
    )
}

export default Sections