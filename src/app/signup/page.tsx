// @ts-nocheck
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FormValidation() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  async function validateSubmit(event) {
    event.preventDefault();

    const errorObj = {};

    if (!email.includes("@")) {
      errorObj.email = "Email is invalid.";
    }

    if (password.length < 6) {
      errorObj.password = "Password must be at least 6 characters.";
    }

    setError(errorObj);

    if (errorObj.email || errorObj.password) return;

    const data = { email, password };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const dat = await res.json();

      if (dat?.success) {
        alert("Account created successfully!");
        router.push("/");
      } else {
        alert(dat?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={validateSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-black">Sign Up</h2>

        <div>
          <label className="block mb-1 text-sm font-semibold text-black">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {error.email && (
            <p className="text-red-500 text-sm mt-1">{error.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-black">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 text-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {error.password && (
            <p className="text-red-500 text-sm mt-1">{error.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-2 text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-600 hover:underline font-semibold"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
