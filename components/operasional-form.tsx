"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addOperasionalData } from "@/lib/operasional"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function OperasionalForm({ user }: { user: any }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [formData, setFormData] = useState({
    tanggal: undefined as Date | undefined,
    pengguna: user?.name || "",
    tujuan: "",
    keterangan: "",
    pengeluaran: "",
    status: "pending",
  })
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    const formDataToSubmit = new FormData()
    formDataToSubmit.append("tanggal", formData.tanggal ? format(formData.tanggal, "yyyy-MM-dd") : "")
    formDataToSubmit.append("pengguna", formData.pengguna)
    formDataToSubmit.append("tujuan", formData.tujuan)
    formDataToSubmit.append("keterangan", formData.keterangan)
    formDataToSubmit.append("pengeluaran", formData.pengeluaran)
    formDataToSubmit.append("status", formData.status)

    const result = await addOperasionalData(formDataToSubmit)

    if (result.success) {
      router.refresh()
      // Reset form
      setFormData({
        tanggal: undefined,
        pengguna: "",
        tujuan: "",
        keterangan: "",
        pengeluaran: "",
        status: "pending",
      })
    }

    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Data Operasional</CardTitle>
        <CardDescription>Masukkan data operasional baru</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tanggal">Tanggal</Label>
              <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="tanggal"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.tanggal && "text-muted-foreground",
                    )}
                    disabled={isLoading}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.tanggal ? format(formData.tanggal, "dd MMMM yyyy", { locale: id }) : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.tanggal}
                    onSelect={(date) => {
                      setFormData({ ...formData, tanggal: date })
                      setIsDatePickerOpen(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                name="tanggal"
                value={formData.tanggal ? format(formData.tanggal, "yyyy-MM-dd") : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pengguna">Pengguna</Label>
              <Input
                id="pengguna"
                name="pengguna"
                placeholder="Nama pengguna"
                required
                disabled={true}
                value={formData.pengguna}
                className="bg-gray-50"
                readOnly
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tujuan">Tujuan</Label>
            <Input
              id="tujuan"
              name="tujuan"
              placeholder="Isi tujuan operasional"
              required
              disabled={isLoading}
              value={formData.tujuan}
              onChange={(e) => setFormData({ ...formData, tujuan: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keterangan">Keterangan</Label>
            <Select
              value={formData.keterangan}
              onValueChange={(value) => setFormData({ ...formData, keterangan: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis kegiatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="KIRIM">KIRIM</SelectItem>
                <SelectItem value="AMBIL BARANG">AMBIL BARANG</SelectItem>
                <SelectItem value="AMBIL BARANG DAN KIRIM">AMBIL BARANG DAN KIRIM</SelectItem>
                <SelectItem value="PRESENTASI">PRESENTASI</SelectItem>
                <SelectItem value="PERJALANAN DINAS">PERJALANAN DINAS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pengeluaran">Pengeluaran (Rp)</Label>
              <Input
                id="pengeluaran"
                name="pengeluaran"
                type="number"
                placeholder="0"
                min="0"
                step="1000"
                disabled={isLoading}
                value={formData.pengeluaran}
                onChange={(e) => setFormData({ ...formData, pengeluaran: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="lunas">Lunas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Menyimpan..." : "Simpan Data"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
