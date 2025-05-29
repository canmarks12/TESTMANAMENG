import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingCart, BarChart3, TrendingUp } from "lucide-react"
import { getOperasionalStats } from "@/lib/operasional"

export async function DashboardCards() {
  const stats = await getOperasionalStats()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const dashboardStats = [
    {
      title: "Total Operasi",
      value: stats.total_operasi.toString(),
      change: "Semua waktu",
      icon: BarChart3,
    },
    {
      title: "Total Pengeluaran",
      value: formatCurrency(Number(stats.total_pengeluaran) || 0),
      change: "Akumulasi",
      icon: TrendingUp,
    },
    {
      title: "Operasi Selesai",
      value: stats.selesai.toString(),
      change: `${stats.dalam_perjalanan} dalam perjalanan`,
      icon: ShoppingCart,
    },
    {
      title: "Operasi Pending",
      value: stats.pending.toString(),
      change: "Menunggu eksekusi",
      icon: Users,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
