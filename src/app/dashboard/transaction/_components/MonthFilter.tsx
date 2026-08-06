"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MonthFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Pega o mês e ano da URL. Se não tiver, usa o mês/ano atual do sistema.
  const currentDate = new Date();
  const currentMonth = Number(searchParams.get("month")) || currentDate.getMonth() + 1;
  const currentYear = Number(searchParams.get("year")) || currentDate.getFullYear();

  // 2. Lógica para avançar e voltar os meses
  const handleMonthChange = (direction: "prev" | "next") => {
    let newMonth = currentMonth;
    let newYear = currentYear;

    if (direction === "prev") {
      newMonth -= 1;
      if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      }
    } else {
      newMonth += 1;
      if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }
    }

    const params = new URLSearchParams(searchParams);
    params.set("month", newMonth.toString());
    params.set("year", newYear.toString());
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const dateObj = new Date(currentYear, currentMonth - 1);
  const monthName = new Intl.DateTimeFormat("pt-BR", { 
    month: "long", 
    year: "numeric" 
  }).format(dateObj);

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => handleMonthChange("prev")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {/* O capitalize deixa a primeira letra do mês maiúscula */}
      <span className="font-semibold capitalize min-w-[160px] text-center">
        {monthName}
      </span>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => handleMonthChange("next")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}