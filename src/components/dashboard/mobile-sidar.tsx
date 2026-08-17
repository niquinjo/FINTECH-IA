"use client"

import { cn } from '@/lib/utils';
import { BotMessageSquare, ChartNoAxesCombined, CreditCard, LogOut, Menu, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { logoutUser } from '@/actions/auth';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { useState } from 'react';

const menuItems = [
  {
    title: "Visão geral",
    href: "/dashboard",
    icon: ChartNoAxesCombined
  },
  {
    title: "Transações",
    href: "/dashboard/transaction",
    icon: CreditCard
  },
  {
    title: "Chat IA",
    href: "/dashboard/chatAi",
    icon: BotMessageSquare
  },
  {
    title: "Configurações",
    href: "/dashboard/settings",
    icon: Settings
  },
];

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* BARRA SUPERIOR MOBILE */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-secondary/90 backdrop-blur-md text-white">
        <div className="flex h-16 items-center justify-between px-4">

          <Sheet open={open} onOpenChange={setOpen}>
            {/* CORREÇÃO AQUI: Removido asChild e repassado o estilo diretamente */}
            <SheetTrigger className="p-2 rounded-xl text-white hover:bg-white/10 cursor-pointer transition-colors inline-flex items-center justify-center">
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            {/* DRAWER / SHEET LATERAL */}
            <SheetContent side="left" className="w-72 p-0 border-r border-white/10 bg-brand-secondary text-white flex flex-col h-full">

              <SheetHeader className="border-b border-white/10 p-6 text-left">
                <SheetTitle className="text-xl font-extrabold tracking-wider text-white">FI<span className="text-xl font-extrabold tracking-wider text-brand-accent/95">NIQ</span>tech</SheetTitle>
              </SheetHeader>

              {/* NAVEGAÇÃO MOBILE */}
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((menu) => {
                  const Icon = menu.icon;
                  const isActive = pathname === menu.href;

                  return (
                    <Link
                      href={menu.href}
                      key={menu.title}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3.5 py-2.5 text-sm rounded-xl font-medium transition-all duration-200',
                        isActive
                          ? "bg-white/15 text-white font-semibold border border-white/20 shadow-xs"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <Icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-white/70')} />
                      {menu.title}
                    </Link>
                  );
                })}
              </nav>

              {/* BOTÃO DE SAIR MOBILE */}
              <div className="p-4 border-t border-white/10 mt-auto">
                <form action={logoutUser}>
                  <Button
                    className="w-full justify-start gap-3 cursor-pointer bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 rounded-xl transition-all font-semibold"
                    type="submit"
                    variant="ghost"
                  >
                    <LogOut className="w-5 h-5" />
                    Sair
                  </Button>
                </form>
              </div>

            </SheetContent>
          </Sheet>

          <h1 className="text-xl font-extrabold tracking-wider text-white">FI<span className="text-xl font-extrabold tracking-wider text-brand-accent/95">NIQ</span>tech</h1>
          <div className="w-10"></div>
        </div>
      </header>
    </div>
  );
}