//@ts-nocheck
"use client";
import { useState, useEffect, useRef } from "react";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Addjob from "../(group)/Addjob";
import DeleteCompany from "./DeleteCompany";

export default function UserDropDown({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e : any ) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer p-1 sm:p-2 bg-transparent"
      >
        <UserCircleIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white bg-green-400 rounded-full" />
      </button>

      {/* Dropdown Content */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-48 sm:w-56 bg-white border border-gray-200 rounded-md shadow-xl z-[9999]"
        >
          {isLoggedIn ? (
            <>
              {/* Admin Options */}
              {user?.data.role === "admin" && (
                <>
                  {!user?.data.company ? (
                    <div
                      onClick={() => setOpen(false)}
                      className="p-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      <Link href="/add-company">Add Company</Link>
                    </div>
                  ) : (
                    <div
                      onClick={() => setOpen(false)}
                      className="p-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      <Link href={`/company/${user?.data?.company?.id}`}>
                        View Company
                      </Link>
                    </div>
                  )}
                </>
              )}

              {/* Add Job (if company exists) */}
              {user?.data?.company && (
                <div className="p-2 text-sm hover:bg-gray-100 rounded-md">
                  <Addjob />
                </div>
              )}

              {/* Job Applications */}
              <div
                onClick={() => setOpen(false)}
                className="p-2 text-sm hover:bg-gray-100 rounded-md"
              >
                <Link href="/view-job-applicant">Your job applications</Link>
              </div>

              <hr className="my-1 border-gray-200" />

              {/* Logout */}
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full text-left p-2 text-sm hover:bg-gray-100 rounded-md text-red-500"
              >
                Logout
              </button>

              {/* Delete Company */}
              {user?.data?.company && (
                <div className="p-2 text-sm text-red-500 hover:bg-red-100 rounded-md">
                  <DeleteCompany id={user?.data?.company?.id} />
                </div>
              )}
            </>
          ) : (
            <>
              <div
                onClick={() => setOpen(false)}
                className="p-2 text-sm hover:bg-gray-100 rounded-md"
              >
                <Link href="/login">Login</Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
