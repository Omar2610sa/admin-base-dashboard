
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,

    useSidebar,
} from "@/components/ui/sidebar"




export function NavCountries({
    countries,
}: {
    countries: {
        name: string
        url: string
        icon: React.ReactNode
    }[]
}) {
    const { isMobile } = useSidebar()

    return (
        <SidebarGroup >
            <SidebarGroupLabel>Countries & Cities</SidebarGroupLabel>
            <SidebarMenu>
                {countries.map((item) => (
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip={item.name}>
                            <a href={item.url}>
                                {item.icon}
                                <span>{item.name}</span>
                            </a>
                        </SidebarMenuButton>

                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
