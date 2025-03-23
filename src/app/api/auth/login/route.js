import pool from "@/lib/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Validate input
    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Username and password are required" }),
        { status: 400 }
      );
    }

    // Query user from database
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    const user = rows[0];

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "your-secret-key", // Use env variable in production
      { expiresIn: "1h" }
    );

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
