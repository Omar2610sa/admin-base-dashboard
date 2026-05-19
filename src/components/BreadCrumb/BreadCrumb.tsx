import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbPage,
    BreadcrumbList,
    BreadcrumbLink,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Home, PlusCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react";


type paths = {
    path: string,
    pathEdit?: string,
    pathAdd?: string,
    icon: LucideIcon,
    iconEdit?: LucideIcon
}


const BreadCrumb = ({ path, pathEdit, pathAdd, icon: Icon, iconEdit: IconEdit }: paths) => {
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
                {/* If Edit */}
                {IconEdit && pathEdit && (

                    <BreadcrumbItem className="flex justify-between gap-2 items-center">

                        <IconEdit className="w-5 h-5 text-foreground" />
                        <BreadcrumbPage className="text-lg text-foreground font-medium ">{pathEdit}</BreadcrumbPage>
                    </BreadcrumbItem>
                )}
                {/* If Add */}
                {pathAdd && (

                    <BreadcrumbItem className="flex justify-between gap-2 items-center">
                        <BreadcrumbSeparator />

                        <PlusCircle className="w-5 h-5 text-foreground" />
                        <BreadcrumbPage className="text-lg text-foreground font-medium ">{pathAdd}</BreadcrumbPage>
                    </BreadcrumbItem>
                )}

            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumb