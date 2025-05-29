"use server"

import { sql } from "./db"

export async function getOperasionalData() {
  try {
    const data = await sql`
      SELECT 
        id,
        tanggal,
        tujuan,
        pengguna,
        keterangan,
        pengeluaran,
        status,
        created_at
      FROM operasional 
      ORDER BY tanggal DESC
    `
    return data
  } catch (error) {
    console.error("Error fetching operasional data:", error)
    return []
  }
}

export async function addOperasionalData(formData: FormData) {
  const tanggal = formData.get("tanggal") as string
  const tujuan = formData.get("tujuan") as string
  const pengguna = formData.get("pengguna") as string
  const keterangan = formData.get("keterangan") as string
  const pengeluaran = Number.parseFloat(formData.get("pengeluaran") as string) || 0
  const status = formData.get("status") as string

  if (!tanggal || !tujuan || !pengguna || !status) {
    return { error: "Semua field wajib diisi" }
  }

  try {
    await sql`
      INSERT INTO operasional (tanggal, tujuan, pengguna, keterangan, pengeluaran, status)
      VALUES (${tanggal}, ${tujuan}, ${pengguna}, ${keterangan}, ${pengeluaran}, ${status})
    `
    return { success: true }
  } catch (error) {
    console.error("Error adding operasional data:", error)
    return { error: "Gagal menambahkan data operasional" }
  }
}

export async function getOperasionalStats() {
  try {
    const stats = await sql`
      SELECT 
        COUNT(*) as total_operasi,
        SUM(pengeluaran) as total_pengeluaran,
        COUNT(CASE WHEN status = 'selesai' THEN 1 END) as selesai,
        COUNT(CASE WHEN status = 'dalam_perjalanan' THEN 1 END) as dalam_perjalanan,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending
      FROM operasional
    `
    return stats[0]
  } catch (error) {
    console.error("Error fetching operasional stats:", error)
    return {
      total_operasi: 0,
      total_pengeluaran: 0,
      selesai: 0,
      dalam_perjalanan: 0,
      pending: 0,
    }
  }
}
