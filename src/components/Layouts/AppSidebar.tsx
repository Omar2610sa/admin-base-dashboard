"use client"

import * as React from "react"

import { NavMain } from "@/components/ui/nav-main"
import { NavCommuications } from "@/components/ui/nav-communication"
import { NavNotifications } from "@/components/ui/nav-notificatins"
import { NavUser } from "@/components/ui/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { Home, SparklesIcon, PanelsTopLeftIcon, ContactIcon, FormIcon, Flag, Building2Icon, Bell, BellMinus } from "lucide-react"

import logo from "@/assets/logo-white.png"
import { NavCountries } from "../ui/nav-countries"
import { SidebarInset, SidebarTrigger } from '../ui/sidebar'

const data = {
    user: {
        name: "omar",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [

        {
            title: "Home",
            url: "/home",
            icon: (
                <Home />
            ),

        },
        {
            title: "Sections",
            url: "/sections",
            icon: (
                <PanelsTopLeftIcon
                />
            ),

        },
        {
            title: "Features",
            url: "/features",
            icon: (
                <SparklesIcon
                />
            ),

        },

    ],

    commuications: [
        {
            name: "Contacts",
            url: "/contacts",
            icon: (
                <ContactIcon
                />
            ),
        },
        {
            name: "Applications",
            url: "/applications",
            icon: (
                <FormIcon
                />
            ),
        },
    ],
    countries: [
        {
            name: "Countries",
            url: "/countries",
            icon: (
                <Flag
                />
            ),
        },
        {
            name: "Cities",
            url: "/cities",
            icon: (
                <Building2Icon
                />
            ),
        },
    ],
    notifications: [
        {
            name: "Admin Notifications",
            url: "/admin-notifications",
            icon: (
                <Bell
                />
            ),
        },
        {
            name: "Notifications",
            url: "/notifications",
            icon: (
                <BellMinus
                />
            ),
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className="border" collapsible="icon" variant="sidebar" {...props}>
            {/* Sidebar Header */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center justify-between gap-5" >
                        <SidebarMenuButton size="lg" asChild className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:hidden">
                            <a href="#">
                                <div className="flex aspect-square size-8   items-center justify-center rounded-full bg-stone-500 text-sidebar-primary-foreground">
                                    <img src={logo} alt="logo" className="size-6 object-contain flex justify-start items-center " />
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
                <NavMain items={data.navMain} />
                <SidebarSeparator />
                <NavCommuications commuications={data.commuications} />
                <SidebarSeparator />
                <NavCountries countries={data.countries} />
                <SidebarSeparator />
                <NavNotifications notifications= {data.notifications} />
            </SidebarContent>

            {/* Sidebar Footer */}

            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar