import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface OperasionalData {
  id: number
  tanggal: string
  tujuan: string
  pengguna: string
  keterangan: string
  pengeluaran: number
  status: string
  created_at: string
}

interface OperasionalTableProps {
  data: OperasionalData[]
}

export function OperasionalTable({ data }: OperasionalTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "selesai":
        return (
          <Badge variant="default" className="bg-green-500">
            Selesai
          </Badge>
        )
      case "dalam_perjalanan":
        return (
          <Badge variant="secondary" className="bg-blue-500 text-white">
            Dalam Perjalanan
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Operasional</CardTitle>
        <CardDescription>Daftar semua kegiatan operasional transportasi</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Tujuan</TableHead>
              <TableHead>Pengguna</TableHead>
              <TableHead>Keterangan</TableHead>
              <TableHead>Pengeluaran</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{formatDate(item.tanggal)}</TableCell>
                <TableCell>{item.tujuan}</TableCell>
                <TableCell>{item.pengguna}</TableCell>
                <TableCell className="max-w-xs truncate">{item.keterangan}</TableCell>
                <TableCell className="font-medium">{formatCurrency(item.pengeluaran)}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
