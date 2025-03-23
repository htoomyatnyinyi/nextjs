"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.token) {
      localStorage.setItem("token", result.token); // Store JWT
      router.push("/about");
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6  rounded shadow">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          {...register("username")}
          placeholder="Username"
          className="mb-2 p-2 border w-full"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="mb-2 p-2 border w-full"
        />
        <button type="submit" className="bg-blue-500  p-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}
