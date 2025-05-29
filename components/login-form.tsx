"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginUser } from "@/lib/auth"
import Link from "next/link"

export default function LoginForm() {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const router = useRouter()

  useEffect(() => {
    const savedCredentials = localStorage.getItem("rememberedCredentials")
    if (savedCredentials) {
      const { email, password } = JSON.parse(savedCredentials)
      setFormData({ email, password })
      setRememberMe(true)
    }
  }, [])

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError("")

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Handle remember me functionality
    if (rememberMe) {
      localStorage.setItem("rememberedCredentials", JSON.stringify({ email, password }))
    } else {
      localStorage.removeItem("rememberedCredentials")
    }

    const result = await loginUser(formData)

    if (result.error) {
      setError(result.error)
    } else if (result.success) {
      router.push("/dashboard")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Masuk
          </CardTitle>
          <CardDescription className="text-gray-500">Masukkan kredensial Anda untuk mengakses akun</CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Alamat Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Masukkan email Anda"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
                disabled={isLoading}
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Kata Sandi
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Masukkan kata sandi Anda"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                required
                disabled={isLoading}
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Ingat saya
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Lupa kata sandi?
              </Link>
            </div>
          </CardContent>

          <CardFooter className="space-y-4">
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sedang masuk...</span>
                </div>
              ) : (
                "Masuk"
              )}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">Belum punya akun? </span>
              <Link
                href="/register"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Daftar di sini
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
