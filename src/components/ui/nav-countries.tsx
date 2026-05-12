
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,

} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"





export function NavCountries({
    countries,
}: {
    countries: {
        name: string
        url: string
        icon: React.ReactNode
    }[]
}) {
    return (
        <SidebarGroup >
            <SidebarGroupLabel>Countries & Cities</SidebarGroupLabel>
            <SidebarMenu>
                {countries.map((item) => (
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip={item.name}>
                            <Link to={item.url}>
                                {item.icon}
                                <span>{item.name}ee</span>
                            </Link>
                        </SidebarMenuButton>

                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
