import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// Initialize users table if it doesn't exist
export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create a test user if none exists
    const existingUsers = await sql`SELECT COUNT(*) as count FROM users`
    if (existingUsers[0].count === "0") {
      // Password: "password123" (hashed)
      await sql`
        INSERT INTO users (email, password, name) 
        VALUES (
          'test@example.com', 
          '$2a$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqu',
          'Test User'
        )
      `
    }
  } catch (error) {
    console.error("Database initialization error:", error)
  }
}

export { sql }
