import { requiredLogin } from "@/lib/auth"
import Sidebar from "@/components/dashboard/sidebar"
import { MobileSidebar } from "@/components/dashboard/mobile-sidar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = await requiredLogin()

  return (
    <div className="flex h-screen overflow-hidden">
      {/*PARA O DESKTOP */}
      <Sidebar userName={user.name} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/*header mobile */}
        <MobileSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container max-w-full px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}