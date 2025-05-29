import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react" // Assuming BarChart3 is a component from lucide-react

export function DashboardChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Analitik Penjualan</CardTitle>
        <CardDescription>Performa penjualan dalam 6 bulan terakhir</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Chart akan ditampilkan di sini</p>
            <p className="text-sm text-gray-400">Integrasi dengan library chart seperti Recharts</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
