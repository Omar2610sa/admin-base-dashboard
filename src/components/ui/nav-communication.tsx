
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"




export function NavCommuications({
  commuications,
}: {
  commuications: {
    name: string
    url: string
    icon: React.ReactNode
  }[]
}) {
  return (
    <SidebarGroup >
      <SidebarGroupLabel>Commuinciatins</SidebarGroupLabel>
      <SidebarMenu>
        {commuications.map((item) => (
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.name}>
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
