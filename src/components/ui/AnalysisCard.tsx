import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    PanelsTopLeftIcon,
    SparklesIcon,
    Users,
    TrendingUp,
    ContactIcon



} from "lucide-react";
import { CounterUp } from "../animations/CounterUp";



const stats = [
    {
        title: "Sections",
        value: "11",
        icon: PanelsTopLeftIcon,
        iconBg: "bg-red-500/30",
        iconColor: "text-red-500",
        type: 'layouts' as const,
    },
    {
        title: "Features",
        value: "35",
        icon: SparklesIcon,
        iconBg: "bg-emerald-500/30",
        iconColor: "text-emerald-500",
        type: 'layouts' as const,
    },
    {
        title: "Users",
        value: "985",
        icon: Users,
        iconBg: "bg-purple-500/30",
        iconColor: "text-purple-500",
        type: 'users' as const,
    },
    {
        title: "Active Users",
        value: "42",
        icon: TrendingUp,
        iconBg: "bg-orange-500/30",
        iconColor: "text-orange-500",
        type: 'users' as const,
    },
    {
        title: "Contacts",
        value: "69",
        icon: ContactIcon,
        iconBg: "bg-blue-500/30",
        iconColor: "text-blue-500",
        type: 'users' as const,
    },
    // {
    //     title: "Countries",
    //     value: "69",
    //     icon: Flag,
    //     iconBg: "bg-yellow-700/30",
    //     iconColor: "text-yellow-600",
    //     type: 'layout' as const,
    // },
] as const;

type AnalysisTab = 'all' | 'users' | 'layouts'

type AnalysisCardProps = {
    activeTab: AnalysisTab
}

export default function AnalysisCard({ activeTab }: AnalysisCardProps) {
    const filteredStats = stats.filter((item) => {
        if (activeTab === 'all') return true
        return item.type === activeTab
    })



    return (
        <div className="grid gap-6 md:grid-cols-5">
            {filteredStats.map((item, index) => {
                const Icon = item.icon;

                return (
                    <Card
                        key={index}
                        className="bg-card text-card-foreground flex flex-col gap-3 rounded-xl  shadow-sm py-4 px-0 group hover:shadow-lg hover:scale-[1.02] hover:border-primary/30 transition-all duration-300 ease-in-out"
                    >
                        <CardHeader className="flex items-center justify-between ">

                            <CardTitle className="!text-[16px] max-w-1  font-medium  text-black dark:text-foreground">
                                {item.title}
                            </CardTitle>

                            <div
                                className={`flex p-3 items-center justify-center rounded-2xl ${item.iconBg} ${item.iconColor}`}
                            >
                                <Icon className={`h-5 w-5  ${item.iconColor}`} />
                            </div>


                        </CardHeader>

                        <CardContent>
                            <h2 className="text-2xl font-bold ">
                                {/* {item.value} */}
                                <CounterUp value={parseInt(item.value)} />
                            </h2>
                        </CardContent>

                    </Card>
                );
            })}
        </div>
    );
}




