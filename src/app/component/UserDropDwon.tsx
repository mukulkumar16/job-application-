// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Addjob from "../(group)/Addjob";
import DeleteCompany from "./DeleteCompany";
import { UserCircle } from "lucide-react";

export default function UserDropDown({ user }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const isLoggedIn = !!user;
  console.log("user >>" , user);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // CLOSE ON CLICK OUTSIDE
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded-full focus:outline-none hover:ring-2 hover:ring-white transition"
      >
        <UserCircle className="w-9 h-9 text-white bg-green-300 rounded-full p-1 shadow-md hover:scale-105 transition-transform" />
      </button>

      {/* DROPDOWN MENU */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 
          animate-fadeSlide flex flex-col overflow-hidden"
        >
          {isLoggedIn ? (
            <>
              {/* Admin Section */}
              {user?.role === "admin" && (
                <>
                  {!user?.company ? (
                    <Link
                      href="/add-company"
                      className="px-4 py-2 text-sm hover:bg-gray-100 transition"
                      onClick={() => setOpen(false)}
                    >
                      Add Company
                    </Link>
                  ) : (
                    <Link
                      href={`/company/${user?.company?.id}`}
                      className="px-4 py-2 text-sm hover:bg-gray-100 transition"
                      onClick={() => setOpen(false)}
                    >
                      View Company
                    </Link>
                  )}
                </>
              )}

              {/* Add Job */}
              {user?.company && (
                <div className="px-4 py-2 text-sm hover:bg-gray-100 transition">
                  <Addjob />
                </div>
              )}

              {/* User Applications */}
              <Link
                href="/applied-job"
                className="px-4 py-2 text-sm hover:bg-gray-100 transition"
                onClick={() => setOpen(false)}
              >
                Your Job Applications
              </Link>

              <hr className="my-1" />

              {/* Logout */}
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 transition"
              >
                Logout
              </button>

              {/* Delete Company */}
              {user?.company && (
                <div className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 transition">
                  <DeleteCompany id={user.company.id} />
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm hover:bg-gray-100 transition"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
