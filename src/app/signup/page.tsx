// @ts-nocheck

'use client';

import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import {
  Mail,
  Lock,
  UserPlus,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function FormValidation() {

  const router = useRouter();



  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");



  async function validateSubmit(event) {

    event.preventDefault();

    const errorObj = {};



    // EMAIL VALIDATION
    if (!email.includes("@")) {

      errorObj.email =
        "Email is invalid.";
    }



    // PASSWORD VALIDATION
    if (password.length < 6) {

      errorObj.password =
        "Password must be at least 6 characters.";
    }



    setError(errorObj);



    if (
      errorObj.email ||
      errorObj.password
    ) return;



    const data = {
      email,
      password,
    };



    try {

      setLoading(true);

      const res = await fetch(
        "/api/signup",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      const dat = await res.json();



      if (dat?.success) {

        setMessage(
          "Account created successfully!"
        );

        router.push("/");

      } else {

        setMessage(
          dat?.message ||
            "Something went wrong."
        );
      }

    } catch (error) {

      console.error(
        "Signup error:",
        error
      );

      setMessage(
        "An error occurred."
      );

    } finally {

      setLoading(false);
    }
  }



  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        flex items-center justify-center
        px-4 py-10
      "
    >

      {/* MAIN CARD */}
      <div
        className="
          relative overflow-hidden
          w-full max-w-md
          rounded-[32px]
          border border-slate-800
          bg-slate-950/80
          backdrop-blur-xl
          shadow-2xl
        "
      >

        {/* GLOW */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-cyan-500/10
            via-transparent
            to-violet-500/10
            pointer-events-none
          "
        />



        <form
          onSubmit={validateSubmit}
          className="
            relative
            p-6 sm:p-8 md:p-10
            space-y-7
          "
        >

          {/* HEADER */}
          <div className="text-center">

            <div
              className="
                mx-auto
                w-20 h-20
                rounded-3xl
                bg-gradient-to-br
                from-cyan-500
                to-violet-600
                flex items-center justify-center
                shadow-xl
                mb-5
              "
            >
              <Sparkles
                className="text-white"
                size={34}
              />
            </div>



            <h2
              className="
                text-3xl md:text-4xl
                font-black
                text-white
              "
            >
              Create Account
            </h2>

            <p
              className="
                text-slate-400
                mt-3
                text-sm md:text-base
              "
            >
              Join and start exploring
              amazing job opportunities.
            </p>

          </div>



          {/* EMAIL FIELD */}
          <div>

            <label
              className="
                flex items-center gap-2
                mb-3
                text-sm font-medium
                text-slate-300
              "
            >
              <Mail
                size={18}
                className="text-cyan-400"
              />
              Email Address
            </label>



            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Enter your email"
              className="
                w-full
                px-5 py-4
                rounded-2xl
                border border-slate-700
                bg-slate-900/80
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-500/20
                transition-all
              "
            />



            {error.email && (

              <p
                className="
                  text-red-400
                  text-sm
                  mt-2
                "
              >
                {error.email}
              </p>

            )}

          </div>



          {/* PASSWORD FIELD */}
          <div>

            <label
              className="
                flex items-center gap-2
                mb-3
                text-sm font-medium
                text-slate-300
              "
            >
              <Lock
                size={18}
                className="text-violet-400"
              />
              Password
            </label>



            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Create your password"
              className="
                w-full
                px-5 py-4
                rounded-2xl
                border border-slate-700
                bg-slate-900/80
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-violet-400
                focus:ring-2
                focus:ring-violet-500/20
                transition-all
              "
            />



            {error.password && (

              <p
                className="
                  text-red-400
                  text-sm
                  mt-2
                "
              >
                {error.password}
              </p>

            )}

          </div>



          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              flex items-center justify-center gap-3
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-violet-600
              text-white
              font-semibold
              shadow-xl
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-300
              disabled:opacity-70
            "
          >

            {loading ? (

              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Creating Account...
              </>

            ) : (

              <>
                <UserPlus size={20} />
                Sign Up
              </>

            )}

          </button>



          {/* MESSAGE */}
          {message && (

            <div
              className="
                text-center
                text-sm
                font-medium
                rounded-2xl
                py-3 px-4
                border
                bg-slate-900/70
                border-slate-800
                text-slate-300
              "
            >
              {message}
            </div>

          )}



          {/* LOGIN LINK */}
          <p
            className="
              text-center
              text-sm
              text-slate-400
            "
          >

            Already have an account?{" "}

            <Link
              href="/login"
              className="
                text-cyan-400
                hover:text-cyan-300
                font-semibold
                transition
              "
            >
              Log in
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}