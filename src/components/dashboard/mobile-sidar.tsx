"use client"
import { cn } from '@/lib/utils';
import { ChartNoAxesCombined, CreditCard, LogOut, Menu, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button';
import { logoutUser } from '@/actions/auth';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
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
    title: "Configurações",
    href: "/dashboard/settings",
    icon: Settings
  },
]

export function MobileSidebar() {

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <header className='sticky top-0 z-50 border-b '>
        <div className='flex h-16 items-center justify-between px-4'>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <div>
                <Menu className="h-6 w-6" />
              </div>
            </SheetTrigger>
            <SheetContent side='left' className="w-72 p-0 border-gray">
              <SheetHeader className='border-b border-b-gray'>
                <SheetTitle className="text-xl font-bold">MENU</SheetTitle>
              </SheetHeader>

              <nav className='flex flex-col p-4 space-y-4'>
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

              <div className='absolute bottom-0 w-full border-t border-gray p-1 bg-red-500 text-white font-bold rounded-t-lg'>
                <form action={logoutUser}>
                  <Button
                    className="w-full justify-start gap-3 cursor-pointer hover:bg-transparent hover:text-white"
                    type='submit'
                    variant="ghost"
                  >
                    <LogOut className='w-5 h-5 font-bold' />
                    Sair
                  </Button>
                </form>
              </div>

            </SheetContent>
          </Sheet>

          <h1 className="text-lg font-bold">niqTech</h1>
          <div className='w-10'></div>
        </div>
      </header>
    </div>
  )
}