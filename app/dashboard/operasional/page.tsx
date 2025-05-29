import { getCurrentUser } from "@/lib/auth"
import { getOperasionalData } from "@/lib/operasional"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { OperasionalTable } from "@/components/operasional-table"
import { OperasionalForm } from "@/components/operasional-form"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function OperasionalPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const allOperasionalData = await getOperasionalData()
  // Filter data berdasarkan nama user yang login
  const operasionalData = allOperasionalData.filter((item) => item.pengguna === user.name)

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
                <BreadcrumbPage>Operasional</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Data Operasional Saya</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Data
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Tambah Data Operasional</DialogTitle>
                  <DialogDescription>Masukkan data operasional baru ke dalam sistem</DialogDescription>
                </DialogHeader>
                <OperasionalForm user={user} />
              </DialogContent>
            </Dialog>
          </div>

          <OperasionalTable data={operasionalData} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
