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


type paths ={
    path: string,
    icon : LucideIcon
}


const BreadCrumb = ({path, icon: Icon }: paths) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="flex justify-between gap-2 items-center">
                    <Home className="text-foreground w-5 h-5" />

                    <BreadcrumbLink className="text-lg text-foreground font-light" href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="flex justify-between gap-2 items-center">
                    <Icon  className=" size-5  text-foreground" />
                    <BreadcrumbPage className="text-lg text-foreground font-medium ">{path}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumb