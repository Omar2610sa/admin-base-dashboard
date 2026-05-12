"use client"

import * as React from "react"


import { NavUser } from "@/components/ui/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, SparklesIcon, PanelsTopLeftIcon, ContactIcon, FormIcon, Flag, Building2Icon, Bell, BellMinus } from "lucide-react"

import { Link, useLocation } from "react-router-dom"


import { SidebarInset, SidebarTrigger } from '../ui/sidebar'


const data = { user: { name: "omar", email: "m@example.com", avatar: "/avatars/shadcn.jpg", }, }

const sidebarSections = [
    {
        label: "Main",
        items: [
            { name: "Home", url: "/home", icon: <Home /> },
            { name: "Sections", url: "/sections", icon: <PanelsTopLeftIcon /> },
            { name: "Features", url: "/features", icon: <SparklesIcon /> },
        ],
    },
    {
        label: "Communications",
        items: [
            { name: "Contacts", url: "/contacts", icon: <ContactIcon /> },
            { name: "Applications", url: "/applications", icon: <FormIcon /> },
        ],
    },
    {
        label: "Locations",
        items: [
            { name: "Countries", url: "/countries", icon: <Flag /> },
            { name: "Cities", url: "/cities", icon: <Building2Icon /> },
        ],
    },
    {
        label: "Notifications",
        items: [
            { name: "Admin Notifications", url: "/admin-notifications", icon: <Bell /> },
            { name: "Notifications", url: "/notifications", icon: <BellMinus /> },
        ],
    },
];






export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const location = useLocation()
    const pathname = location.pathname;


    const isActive = (url: string) => {
        if (!url) return false;
        if (url === "/") return pathname === "/";
        return pathname === url;
    };
    return (
        <Sidebar className="border" collapsible="icon" variant="sidebar" {...props}>
            {/* Sidebar Header */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center justify-between gap-5" >
                        <SidebarMenuButton size="lg" asChild className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:hidden">
                            <a href="#">
                                <div className="flex aspect-square size-8   items-center justify-center rounded-full bg-sidebar-accent text-sidebar-primary-foreground">
                                    SA
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Eraf Dashboard</span>
                                    <span className="truncate text-xs">Super Admin</span>
                                </div>
                            </a>
                        </SidebarMenuButton>

                        {/* Collabsed */}
                        <div className="flex justify-center items-center">

                            <SidebarInset>
                                <SidebarTrigger size="lg" />
                            </SidebarInset>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent className="scrollbar-thumb-sidebar-accent scrollbar-thin">
                {/* <NavMain items={data.navMain} />
                <SidebarSeparator />
                <NavCommuications commuications={data.commuications} />
                <SidebarSeparator />
                <NavCountries countries={data.countries} />
                <SidebarSeparator />
                <NavNotifications notifications= {data.notifications} /> */}
                {sidebarSections.map((section) => (
                    <SidebarGroup key={section.label}>

                        <SidebarGroupLabel>
                            {section.label}
                        </SidebarGroupLabel>

                        <SidebarMenu>
                            {section.items.map((item) => (
                                <SidebarMenuItem className="py-0.5" key={item.name}>
                                    <SidebarMenuButton isActive={isActive(item.url)} asChild tooltip={item.name}>
                                        <Link to={item.url}>
                                            {item.icon}
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                    </SidebarGroup>
                ))}
            </SidebarContent>

            {/* Sidebar Footer */}

            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar