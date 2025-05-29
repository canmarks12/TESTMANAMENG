import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { initializeDatabase } from "@/lib/db"

export default async function HomePage() {
  // Initialize database on first load
  await initializeDatabase()

  const user = await getCurrentUser()

  if (user) {
    redirect("/dashboard")
  } else {
    redirect("/login")
  }
}
