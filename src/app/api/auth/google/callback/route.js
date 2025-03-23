import pool from "@/lib/database";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req) {
  try {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.JWT_SECRET) {
      throw new Error(
        "Missing GOOGLE_CLIENT_ID or JWT_SECRET in environment variables"
      );
    }

    const { credential } = await req.json();
    if (!credential) {
      return new Response(JSON.stringify({ error: "No credential provided" }), {
        status: 400,
      });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const googleId = payload["sub"];
    const email = payload["email"];
    const username = payload["name"] || email.split("@")[0];

    // Check or register user
    let [users] = await pool.query("SELECT * FROM users WHERE google_id = ?", [
      googleId,
    ]);
    let user = users[0];

    if (!user) {
      await pool.query(
        "INSERT INTO users (username, google_id, email) VALUES (?, ?, ?)",
        [username, googleId, email]
      );
      [users] = await pool.query("SELECT * FROM users WHERE google_id = ?", [
        googleId,
      ]);
      user = users[0];
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = new Response(
      JSON.stringify({ message: "Google login successful" }),
      { status: 200 }
    );
    response.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Max-Age=3600; SameSite=Strict${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`
    );
    return response;
  } catch (error) {
    console.error("Google auth error details:", error.message, error.stack);
    return new Response(
      JSON.stringify({
        error: "Google authentication failed",
        details: error.message,
      }),
      { status: 500 }
    );
  }
} // import pool from "@/lib/database";
// import jwt from "jsonwebtoken";
// import { OAuth2Client } from "google-auth-library";

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// console.log("Google Client ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

// export async function POST(req) {
//   try {
//     const { credential } = await req.json();
//     if (!credential) {
//       return new Response(JSON.stringify({ error: "No credential provided" }), {
//         status: 400,
//       });
//     }

//     // Verify Google token
//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     const googleId = payload["sub"];
//     const email = payload["email"];
//     const username = payload["name"] || email.split("@")[0];

//     // Check or register user
//     let [users] = await pool.query("SELECT * FROM users WHERE google_id = ?", [
//       googleId,
//     ]);
//     let user = users[0];

//     if (!user) {
//       await pool.query(
//         "INSERT INTO users (username, google_id, email) VALUES (?, ?, ?)",
//         [username, googleId, email]
//       );
//       [users] = await pool.query("SELECT * FROM users WHERE google_id = ?", [
//         googleId,
//       ]);
//       user = users[0];
//     }

//     // Generate JWT
//     const token = jwt.sign(
//       { id: user.id, username: user.username },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1h",
//       }
//     );

//     const response = new Response(
//       JSON.stringify({ message: "Google login successful" }),
//       { status: 200 }
//     );
//     response.headers.set(
//       "Set-Cookie",
//       `token=${token}; Path=/; HttpOnly; Max-Age=3600; SameSite=Strict`
//     );
//     return response;
//   } catch (error) {
//     console.error("Google auth error details:", error.message, error.stack);
//     return new Response(
//       JSON.stringify({
//         error: "Google authentication failed",
//         details: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }

// // import pool from "@/lib/database";
// // import jwt from "jsonwebtoken";
// // import { OAuth2Client } from "google-auth-library";

// // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // export async function POST(req) {
// //   try {
// //     const { credential } = await req.json();

// //     // Verify Google token
// //     const ticket = await client.verifyIdToken({
// //       idToken: credential,
// //       audience: process.env.GOOGLE_CLIENT_ID,
// //     });
// //     const payload = ticket.getPayload();
// //     const googleId = payload["sub"]; // Unique Google ID
// //     const email = payload["email"];
// //     const username = payload["name"] || email.split("@")[0]; // Fallback to email prefix

// //     // Check if user exists, if not, register
// //     let [users] = await pool.query("SELECT * FROM users WHERE google_id = ?", [
// //       googleId,
// //     ]);
// //     let user = users[0];

// //     if (!user) {
// //       // Register new user (no password needed for Google auth)
// //       await pool.query(
// //         "INSERT INTO users (username, google_id, email) VALUES (?, ?, ?)",
// //         [username, googleId, email]
// //       );
// //       [users] = await pool.query("SELECT * FROM users WHERE google_id = ?", [
// //         googleId,
// //       ]);
// //       user = users[0];
// //     }

// //     // Generate JWT
// //     const token = jwt.sign(
// //       { id: user.id, username: user.username },
// //       process.env.JWT_SECRET,
// //       {
// //         expiresIn: "1h",
// //       }
// //     );

// //     // Set cookie
// //     const response = new Response(
// //       JSON.stringify({ message: "Google login successful" }),
// //       { status: 200 }
// //     );
// //     response.headers.set(
// //       "Set-Cookie",
// //       `token=${token}; Path=/; HttpOnly; Max-Age=3600; SameSite=Strict`
// //     );
// //     return response;
// //   } catch (error) {
// //     console.error("Google auth error:", error);
// //     return new Response(
// //       JSON.stringify({ error: "Google authentication failed" }),
// //       { status: 500 }
// //     );
// //   }
// // }
