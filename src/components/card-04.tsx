
import logo from "@/assets/logo-white.png"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import pattern from "@/assets/patterns/386289221_1854faaa-ed45-4a79-a0a4-42e6d3d70c76.jpg"
import { SaudiRiyal } from "lucide-react";

export default function CardBanner({ title, description }: { title: string, description: string }) {
  return (
    <Card className="w-full relative grid md:grid-cols-2 items-center justify-between bg-sidebar-accent text-white py-6  shadow-none">
      <CardHeader className=" flex flex-col items-start gap-3" >
        <CardTitle className="text-4xl font-bold mb-2 tracking-tight">
          {title}
        </CardTitle>
        <p className=" text-lg opacity-90 max-w-md  text-slate-100">
          {description}
        </p>
      </CardHeader>
      <CardContent className="flex justify-end gap-4 mr-8">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
        <p className="text-xs text-slate-100 uppercase  mb-1">Total Revenue Today</p>
          <p className="text-2xl font-bold flex justify-center items-center gap-1">0<SaudiRiyal /></p>
        </div>
      </CardContent>

    {/* Pattern */}
      <img src={pattern} className="absolute  left-0 w-full h-full object-cover opacity-20" />

    </Card>
    
  );
}
