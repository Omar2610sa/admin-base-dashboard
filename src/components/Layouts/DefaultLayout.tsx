import { ThemeProvider } from "../theme-provider";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";


import { TooltipProvider } from "@/components/ui/tooltip";

export default function DefaultLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <TooltipProvider>

            <ThemeProvider>
                <SidebarProvider>

                    <AppSidebar />
                    <main className="w-full">
                        <Navbar />
                        <div className="px-6 py-4 ">{children}</div>
                    </main>
                </SidebarProvider>
            </ThemeProvider >
        </TooltipProvider>
    )
}

// DefaultLayout