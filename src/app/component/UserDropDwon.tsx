// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Addjob from "../(group)/Addjob";
import DeleteCompany from "./DeleteCompany";
import {
  UserCircle,
  Briefcase,
  Building2,
  LogOut,
  LogIn,
  PlusCircle,
} from "lucide-react";

export default function UserDropDown({ user }) {

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const dropdownRef = useRef(null);

  const isLoggedIn = !!user;

  async function handleLogout() {
    try {

      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      router.refresh();
      router.push("/");

    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {

    function onClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };

  }, []);

  return (
    <div className="relative" ref={dropdownRef}>

      {/* PROFILE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="group rounded-full focus:outline-none"
      >
        <div className="relative">

          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>

          <UserCircle
            className="relative w-10 h-10 text-white bg-slate-900 rounded-full p-1 border border-slate-700 shadow-xl group-hover:scale-105 transition duration-300"
          />
        </div>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute -right-12 mt-4 w-64
            bg-slate-950/95 backdrop-blur-xl
            border border-slate-800
            rounded-2xl shadow-2xl
            overflow-hidden
            z-50
            animate-in fade-in slide-in-from-top-2 duration-200
          "
        >

          {/* USER INFO */}
          {isLoggedIn && (
            <div className="px-5 py-4 border-b border-slate-800">
              <h3 className="text-white font-semibold text-sm truncate">
                {user?.name || "User"}
              </h3>

              <p className="text-slate-400 text-xs mt-1">
                {user?.email}
              </p>
            </div>
          )}

          {/* MENU ITEMS */}
          <div className="py-2">

            {isLoggedIn ? (
              <>

                {/* ADMIN OPTIONS */}
                {user?.role === "admin" && (
                  <>
                    {!user?.company ? (

                      <Link
                        href="/add-company"
                        onClick={() => setOpen(false)}
                        className="
                          flex items-center gap-3
                          px-5 py-3 text-sm text-slate-200
                          hover:bg-slate-900 transition
                        "
                      >
                        <Building2 size={18} />
                        Add Company
                      </Link>

                    ) : (

                      <Link
                        href={`/company/${user?.company?.id}`}
                        onClick={() => setOpen(false)}
                        className="
                          flex items-center gap-3
                          px-5 py-3 text-sm text-slate-200
                          hover:bg-slate-900 transition
                        "
                      >
                        <Building2 size={18} />
                        View Company
                      </Link>

                    )}
                  </>
                )}

                {/* ADD JOB */}
                {user?.company && (
                  <div
                    className="
                      flex items-center gap-3
                      px-5 py-3 text-sm text-slate-200
                      hover:bg-slate-900 transition
                    "
                  >
                    <PlusCircle size={18} />
                    <Addjob />
                  </div>
                )}

                {/* APPLICATIONS */}
                <Link
                  href="/applied-job"
                  onClick={() => setOpen(false)}
                  className="
                    flex items-center gap-3
                    px-5 py-3 text-sm text-slate-200
                    hover:bg-slate-900 transition
                  "
                >
                  <Briefcase size={18} />
                  Your Applications
                </Link>

                {/* DELETE COMPANY */}
                {user?.company && (
                  <div
                    className="
                      px-5 py-3 text-sm
                      text-rose-400
                      hover:bg-rose-500/10
                      transition
                    "
                  >
                    <DeleteCompany id={user.company.id} />
                  </div>
                )}

                {/* DIVIDER */}
                <div className="border-t border-slate-800 my-2"></div>

                {/* LOGOUT */}
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="
                    w-full
                    flex items-center gap-3
                    px-5 py-3
                    text-sm text-rose-400
                    hover:bg-rose-500/10
                    transition
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="
                  flex items-center gap-3
                  px-5 py-3 text-sm text-slate-200
                  hover:bg-slate-900 transition
                "
              >
                <LogIn size={18} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}