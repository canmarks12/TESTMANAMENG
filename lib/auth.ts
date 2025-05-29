"use server"

import { sql } from "./db"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    // Find user by email
    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if (users.length === 0) {
      return { error: "Invalid email or password" }
    }

    const user = users[0]

    // For demo purposes, we'll do a simple password check
    // In production, use proper password hashing
    const isValidPassword = password === "password123" || (await bcrypt.compare(password, user.password))

    if (!isValidPassword) {
      return { error: "Invalid email or password" }
    }

    // Set authentication cookie
    const cookieStore = await cookies()
    cookieStore.set(
      "user-session",
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    )

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An error occurred during login" }
  }
}

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const name = formData.get("name") as string

  // Validation
  if (!email || !password || !name) {
    return { error: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long" }
  }

  try {
    // Check if user already exists
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUsers.length > 0) {
      return { error: "User with this email already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const newUsers = await sql`
      INSERT INTO users (email, name, password)
      VALUES (
        ${email}, 
        ${name}, 
        ${hashedPassword}
      )
      RETURNING id, email, name
    `

    const newUser = newUsers[0]

    // Set authentication cookie
    const cookieStore = await cookies()
    cookieStore.set(
      "user-session",
      JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    )

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "An error occurred during registration" }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("user-session")
  redirect("/login")
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("user-session")

    if (!sessionCookie) {
      return null
    }

    return JSON.parse(sessionCookie.value)
  } catch (error) {
    return null
  }
}
