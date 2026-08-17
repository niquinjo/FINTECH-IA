"use client"

import { cn } from '@/lib/utils';
import { ChartNoAxesCombined, CreditCard, LogOut, Settings, BotMessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { logoutUser } from '@/actions/auth';

interface SidebarProps {
  userName: string;
}

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
    icon: Settings,
    disabled: true,
  },
];

export default function Sidebar({ userName }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 bg-brand-secondary/95 backdrop-blur-xl border-r border-white/10 text-white select-none">

      {/* HEADER DA SIDEBAR */}
      <div className="border-b border-white/10 p-6">
        <h2 className="text-xl font-extrabold tracking-wider text-white">FI<span className="text-xl font-extrabold tracking-wider text-brand-accent/95">NIQ</span>tech</h2>
        <p className="text-xs text-white/60 font-medium mt-1">
          Olá, <span className="text-white font-semibold">{userName}</span>
        </p>
      </div>

      {/* MENU DE NAVEGAÇÃO */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname === menu.href;
          
          if (menu.disabled) {
            return (
              <div
                key={menu.title}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 text-sm rounded-xl font-medium opacity-40 cursor-not-allowed select-none text-white/50'
                )}
                title="Em breve"
              >
                <Icon className="w-5 h-5 text-white/40" />
                {menu.title}
                <span className="ml-auto text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/60 font-semibold uppercase">
                  Em breve
                </span>
              </div>
            );
          }

          return (
            <Link
              href={menu.href}
              key={menu.title}
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

      {/* BOTÃO DE SAIR ELEGANTE */}
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

    </aside>
  );
}