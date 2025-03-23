"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        router.push("/dashboard");
      } else {
        throw new Error(result.error || "Login failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("/api/auth/google/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const result = await res.json();

      if (res.ok) {
        router.push("/dashboard");
      } else {
        throw new Error(result.error || "Google login failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6  rounded shadow">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <div className="mb-4">
            <input
              {...register("username", { required: "Username is required" })}
              placeholder="Username"
              className="p-2 border w-full"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="p-2 border w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="bg-blue-500  p-2 w-full">
            Login
          </button>
        </form>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Login Failed")}
          />
        </div>
      </div>
    </div>
  );
} // "use client";

// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const { register, handleSubmit } = useForm();
//   const router = useRouter();

//   const onSubmit = async (data) => {
//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     const result = await res.json();
//     if (result.token) {
//       localStorage.setItem("token", result.token); // Store JWT
//       router.push("/about");
//     } else {
//       alert(result.error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form onSubmit={handleSubmit(onSubmit)} className="p-6  rounded shadow">
//         <h2 className="text-2xl mb-4">Login</h2>
//         <input
//           {...register("username")}
//           placeholder="Username"
//           className="mb-2 p-2 border w-full"
//         />
//         <input
//           {...register("password")}
//           type="password"
//           placeholder="Password"
//           className="mb-2 p-2 border w-full"
//         />
//         <button type="submit" className="bg-blue-500  p-2 w-full">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
