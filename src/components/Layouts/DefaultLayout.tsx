// import { PropagateLoader } from "react-spinners";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../theme-provider";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";


import { TooltipProvider } from "@/components/ui/tooltip";

export default function DefaultLayout() {
    
    return (
        <TooltipProvider>

            <ThemeProvider>
                <SidebarProvider>

                    <AppSidebar />
                    <main className="md:w-full">

                        <Navbar  />

                        <div className="container">
                            <Outlet />
                            </div>
                    </main>
                </SidebarProvider>
            </ThemeProvider >
        </TooltipProvider>
    )
}

// DefaultLayout


                // <div className="flex justify-center items-center ">
                //     <PropagateLoader color="#b7a086" />
                // </div>