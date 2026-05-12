import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    PanelsTopLeftIcon,
    SparklesIcon,
    Users,
    TrendingUp,
    Flag,
ContactIcon

} from "lucide-react";

const stats = [
    {
        title: "Sections",
        value: "11",
        icon: PanelsTopLeftIcon,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
    },
    {
        title: "Features",
        value: "35",
        icon: SparklesIcon,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
    },
    {
        title: "Users",
        value: "985",
        change: "-98.24%",
        negative: true,
        icon: Users,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
    },
    {
        title: "Active Users",
        value: "69",
        icon: TrendingUp,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
    },
    {
        title: "Contacts",
        value: "69",
        icon: ContactIcon,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        title: "Countries",
        value: "69",
        icon: Flag,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
    },
];

export default function AnalysisCard() {
    return (
        <div className="grid gap-6 md:grid-cols-4">
            {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                    <Card
                        key={index}
                        className="rounded-3xl w-6xs  bg-white dark:bg-background shadow-sm hover:scale-[1.05] hover:border-primary/30 duration-300"
                    >
                        <CardContent className="flex flex-col gap-2">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex flex-col items-start justify-start gap-3">
                                    <h3 className="text-[18px] font-medium text-black dark:text-foreground">
                                        {item.title}
                                    </h3>
                                    <h2 className="text-2xl font-bold ">
                                        {item.value}
                                    </h2>
                                </div>

                                <div
                                    className={`flex p-4 items-center justify-center rounded-2xl ${item.iconBg}`}
                                >
                                    <Icon className={`h-6 w-6 ${item.iconColor}`} />
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}




