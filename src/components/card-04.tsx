
import logo from "@/assets/logo-white.png"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardBanner({ title, description }: { title: string, description: string }) {
  return (
    <Card className="w-full grid grid-cols-2 items-center justify-between  text-white bg-gradient-to-r from-[#ac9259] to-[#d4c48f] py-6  shadow-none">

      <CardHeader className="px-8 flex flex-col items-start gap-3" >
        <CardTitle className="mb-2 font-medium text-3xl tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className=" max-w-lg text-lg text-slate-100">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end gap-4 mr-12">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
        <p className="text-xs uppercase opacity-70 mb-1">Total Vistis Today</p>
          <p className="text-2xl font-bold flex items-center gap-1">0</p>
        </div>
      </CardContent>
    </Card>
  );
}
