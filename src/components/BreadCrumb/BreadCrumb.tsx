import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbPage,
    BreadcrumbList,
    BreadcrumbLink,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import type { LucideIcon } from "lucide-react";


type paths = {
    path: string,
    pathEdit?: string,
    icon: LucideIcon,
    iconEdit: LucideIcon
}


const BreadCrumb = ({ path, pathEdit, icon: Icon, iconEdit: IconEdit }: paths) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="flex justify-between gap-2 items-center">
                    <Home className="text-foreground w-5 h-5" />

                    <BreadcrumbLink className="text-lg text-foreground font-light" href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="flex justify-between gap-2 items-center">
                    <Icon className=" size-5  text-foreground" />
                    <BreadcrumbPage className="text-lg text-foreground font-medium ">{path}</BreadcrumbPage>
                </BreadcrumbItem>
                {
                    // Edit this part to make it dynamic based on the path
                    pathEdit === "Edit Slider" ? <><BreadcrumbSeparator />
                        <BreadcrumbItem className="flex justify-between gap-2 items-center">
                            <IconEdit className=" size-5  text-foreground" />
                            <BreadcrumbPage className="text-lg text-foreground font-medium ">{pathEdit}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </> : null
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumb