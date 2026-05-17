import CardBanner from "@/components/card-04"
import Tablist from "@/components/Tablist"
import AnalysisCard from "@/components/ui/AnalysisCard"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbPage,
    BreadcrumbList,

} from "@/components/ui/breadcrumb"
import { useState } from "react"
import { Home } from "lucide-react"

// className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'

const HomePage = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'users' | 'layouts'>('all')


    return (

        <div className="flex flex-col gap-5">

            {/* Breadcrump */}
            <Breadcrumb >
                <BreadcrumbList>
                    <BreadcrumbItem className="flex justify-between gap-2 items-center">
                        <Home className="text-foreground w-5 h-5" />
                        <BreadcrumbPage className="text-lg font-normal" >Home</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Welcome Back card */}
            <CardBanner title="Welcome Back" description="Here's what's happening with your Website today." />

            {/* Tablist */}
            <Tablist value={activeTab} onValueChange={(v) => setActiveTab(v as 'all' | 'users' | 'layouts')} />


            {/* Cards */}

            <AnalysisCard activeTab={activeTab} />


        </div>
    )
}

export default HomePage