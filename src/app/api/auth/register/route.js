import pool from "@/lib/database";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    console.log(req.json(), username, password, "at backend");
    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Username and password are required" }),
        { status: 400 }
      );
    }
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (existingUsers.length > 0) {
      return new Response(JSON.stringify({ error: "Username already taken" }), {
        status: 409,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);
    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
} // import pool from "@/lib/database";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   try {
//     const { username, password } = await req.json();
//     console.log(username, password, "at register routes backend ");

//     // Validate input
//     if (!username || !password) {
//       return new Response(
//         JSON.stringify({ error: "Username and password are required" }),
//         { status: 400 }
//       );
//     }

//     // Check if user already exists
//     const [existingUsers] = await pool.query(
//       "SELECT * FROM users WHERE username = ?",
//       [username]
//     );
//     if (existingUsers.length > 0) {
//       return new Response(JSON.stringify({ error: "Username already taken" }), {
//         status: 409,
//       });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert new user into database
//     await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [
//       username,
//       hashedPassword,
//     ]);

//     return new Response(
//       JSON.stringify({ message: "User registered successfully" }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Registration error:", error);
//     return new Response(JSON.stringify({ error: "Internal server error" }), {
//       status: 500,
//     });
//   }
// }
