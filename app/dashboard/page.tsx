import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardChart } from "@/components/dashboard-chart"
import { RecentActivity } from "@/components/recent-activity"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <AdminSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Admin Panel</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <DashboardCards />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <DashboardChart />
            <RecentActivity />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
