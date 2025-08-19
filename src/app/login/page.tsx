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
  const [msg, setMsg] = useState("");

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
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const dat = await res.json();

      if (dat?.success) {
        setMsg(dat.message || "Login successful");
        alert("Login successful!");
        router.push("/");
      } else {
        setMsg(dat.message || "Login failed");
        alert("Oops! Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMsg("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={validateSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-black">Sign In</h2>

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
            className="w-full px-4 py-2 border rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {error.password && (
            <p className="text-red-500 text-sm mt-1">{error.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
        >
          Login
        </button>

        {msg && (
          <p className="text-center text-sm font-medium text-black">{msg}</p>
        )}

        <p className="text-center text-sm mt-2 text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-green-600 hover:underline font-semibold"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
