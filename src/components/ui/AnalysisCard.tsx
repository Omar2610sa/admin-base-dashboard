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
    Flag,
    ContactIcon

} from "lucide-react";
import { CounterUp } from "../animations/CounterUp";



const stats = [
    {
        title: "Sections",
        value: "11",
        icon: PanelsTopLeftIcon,
        iconBg: "bg-red-300/60",
        iconColor: "text-red-600",
    },
    {
        title: "Features",
        value: "35",
        icon: SparklesIcon,
        iconBg: "bg-green-300/60",
        iconColor: "text-green-600",
    },
    {
        title: "Users",
        value: "985",
        icon: Users,
        iconBg: "bg-purple-300/60",
        iconColor: "text-purple-600",
    },
    {
        title: "Active Users",
        value: "69",
        icon: TrendingUp,
        iconBg: "bg-orange-300/60",
        iconColor: "text-orange-600",
    },
    {
        title: "Contacts",
        value: "69",
        icon: ContactIcon,
        iconBg: "bg-blue-300/60",
        iconColor: "text-blue-600",
    },
    // {
    //     title: "Countries",
    //     value: "69",
    //     icon: Flag,
    //     iconBg: "bg-yellow-300/60",
    //     iconColor: "text-yellow-600",
    // },
];

export default function AnalysisCard() {
    return (
        <div className="grid gap-6 md:grid-cols-5">
            {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                    <Card
                        size="sm"
                        key={index}
                        className="rounded-xl   bg-white dark:bg-background shadow-2xs hover:scale-[1.05] hover:border-primary/30 duration-300"
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




