"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data, "at register frontend page");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (res.ok) {
      alert("Registration successful! Please log in.");
      router.push("/login");
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6  rounded shadow">
        <h2 className="text-2xl mb-4">Register</h2>
        <input
          {...register("username", { required: true })}
          placeholder="Username"
          className="mb-2 p-2 border w-full"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="mb-2 p-2 border w-full"
        />
        <button type="submit" className="bg-green-500  p-2 w-full">
          Register
        </button>
        <p className="mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
