"use client"
import { cn } from '@/lib/utils';
import { ChartNoAxesCombined, CreditCard, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
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
    title: "Configurações",
    href: "/dashboard/settings",
    icon: Settings
  },
]

export default function Sidebar({ userName }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className=" hidden lg:flex flex-col h-screen w-64 border-r border-gray">
      {/*HEADER*/}
      <div className="border-b border-b-gray p-6">
        <h2 className="text-xl font-bold">niqTech</h2>
        <p className="text-sm text-gray-600 mt-1">
          Olá, {userName}
        </p>
      </div>

      {/* MENU */}

      <nav className='flex-1 p-4 space-y-4'>
        {menuItems.map(menu => {

          const Icon = menu.icon;
          const isActive = pathname === menu.href;
          return (
            <Link
              href={menu.href}
              key={menu.title}
              className={cn('flex items-center gap-3 px-3 py-2 text-sm rounded-md text-white transition-colors duration-100',
                isActive ? "bg-gray-500" : "hover:bg-gray-200 text-black"
              )}
            >
              <Icon className='w-5 h-5' />
              {menu.title}
            </Link>
          )
        })}
      </nav>
      <div className='border-t border-gray p-1 bg-red-500 text-white font-bold rounded-t-lg '>
        <form action={logoutUser}>
          <Button
            className="w-full justify-start gap-3 cursor-pointer hover:bg-transparent hover:text-white"
            type='submit'
            variant="ghost"
          >
            <LogOut className='w-5 h-5' />
            Sair
          </Button>
        </form>
      </div>
    </aside>
  )
}