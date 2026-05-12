
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"





export function NavNotifications({
    notifications,
}: {
    notifications: {
        name: string
        url: string
        icon: React.ReactNode
    }[]
}) {


    return (
        <SidebarGroup >
            <SidebarGroupLabel>Notifications</SidebarGroupLabel>
            <SidebarMenu>
                {notifications.map((item) => (
                    <SidebarMenuItem>
                        <SidebarMenuButton is asChild tooltip={item.name}>
                            <Link to={item.url}>
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>

                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
