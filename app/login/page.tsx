import LoginForm from "@/components/login-form"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  // Redirect if already logged in
  const user = await getCurrentUser()
  if (user) {
    redirect("/dashboard")
  }

  return <LoginForm />
}
