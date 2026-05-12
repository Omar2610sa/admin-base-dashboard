import CardBanner from "@/components/card-04"
import AnalysisCard from "@/components/ui/AnalysisCard"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbPage,
    BreadcrumbList,

} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"


// import  useFetch  from "@/hooks/useFetch"
// className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'

const HomePage = () => {

    // const { data: statistics } = useFetch("/api/admin/statistics");


    // console.log(statistics)
    return (
        <div className="flex flex-col gap-6">
            {/* Breadcrump */}
            <Breadcrumb >
                <BreadcrumbList>
                    <BreadcrumbItem  className="flex justify-between gap-3 items-center">
                        <Home width={24} height={24} />
                        <BreadcrumbPage className="text-xl" >Home</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Welcome Back card */}
            <CardBanner title="Welcome Back" description="Here's what's happening with your Website today." />
            {/* Cards */}

            <AnalysisCard />
        </div>
    )
}

export default HomePage