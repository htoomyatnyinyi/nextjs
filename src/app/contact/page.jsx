import jwt from "jsonwebtoken";
import pool from "@/lib/database";

export default async function Contact() {
  // Token validated by middleware; fetch user data server-side
  const token =
    /* Assume middleware passed it */ process.env.NODE_ENV === "development"
      ? "dummy-token-for-dev"
      : null;
  const decoded = jwt.verify(token || "", process.env.JWT_SECRET, {
    ignoreExpiration: true,
  }); // For dev only
  const [rows] = await pool.query("SELECT username FROM users WHERE id = ?", [
    decoded.id,
  ]);
  const user = rows[0];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-gray-100 rounded shadow">
        <h2 className="text-2xl">Welcome, {user.username}!</h2>
        <p>This is your dashboard.</p>
        <a href="/" className="text-blue-500">
          Logout
        </a>
      </div>
    </div>
  );
}
