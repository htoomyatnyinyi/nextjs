import jwt from "jsonwebtoken";
import pool from "@/lib/database";

// Server-side data fetching
export default async function Dashboard({ searchParams }) {
  const token = searchParams.token || ""; // Pass token via URL for simplicity (in production, use cookies)

  let user;
  try {
    user = jwt.verify(token, "your-secret-key");
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Unauthorized
      </div>
    );
  }

  // Fetch user data from MySQL
  const [rows] = await pool.query("SELECT username FROM users WHERE id = ?", [
    user.id,
  ]);
  const dbUser = rows[0];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-gray-100 rounded shadow">
        <h2 className="text-2xl">Welcome, {dbUser.username}!</h2>
        <p>This is your dashboard.</p>
        <a href="/" className="text-blue-500">
          Logout
        </a>
      </div>
    </div>
  );
}
