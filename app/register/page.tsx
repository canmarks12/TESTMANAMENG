import RegisterForm from "@/components/register-form"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function RegisterPage() {
  // Redirect if already logged in
  const user = await getCurrentUser()
  if (user) {
    redirect("/dashboard")
  }

  return <RegisterForm />
}
