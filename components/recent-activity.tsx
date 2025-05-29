import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    user: "Ahmad Rizki",
    action: "Membuat pesanan baru",
    time: "2 menit yang lalu",
    status: "success",
  },
  {
    id: 2,
    user: "Siti Nurhaliza",
    action: "Mengupdate profil",
    time: "5 menit yang lalu",
    status: "info",
  },
  {
    id: 3,
    user: "Budi Santoso",
    action: "Menghapus dokumen",
    time: "10 menit yang lalu",
    status: "warning",
  },
  {
    id: 4,
    user: "Maya Sari",
    action: "Login ke sistem",
    time: "15 menit yang lalu",
    status: "success",
  },
  {
    id: 5,
    user: "Andi Wijaya",
    action: "Gagal login",
    time: "20 menit yang lalu",
    status: "error",
  },
]

export function RecentActivity() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Aktivitas Terbaru</CardTitle>
        <CardDescription>Aktivitas pengguna dalam sistem</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    activity.status === "success"
                      ? "default"
                      : activity.status === "error"
                        ? "destructive"
                        : activity.status === "warning"
                          ? "secondary"
                          : "outline"
                  }
                >
                  {activity.status}
                </Badge>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
