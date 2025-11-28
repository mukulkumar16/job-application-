// @ts-nocheck
"use client";

import { useContext, useEffect, useState } from "react";
import { userContext } from "../(group)/layout";
import Link from "next/link";
import UserDropDown from "./UserDropDwon";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const [q, setQ] = useState("");
  const [sugg, setsugg] = useState([]);
  const { user } = useContext(userContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

async function handleLogout() {
  await fetch("/api/logout");
  router.push("/");
}

  useEffect(() => {
    async function getSugg() {
      const sug = await fetch("http://localhost:3000/api/search/suggestion?q=" + q);
      const data = await sug.json();
      setsugg(data);
    }

    if (q) getSugg();
    else setsugg([]);
  }, [q]);

  return (
    <header className="w-full bg-emerald-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-white tracking-wide whitespace-nowrap"
        >
          Jobs <span className="text-yellow-300">Dekhoo</span>
        </Link>

        {/* Hamburger Icon (mobile only) */}
        <button
          className="sm:hidden text-white"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Search Bar */}
        <div className="hidden sm:flex flex-1 justify-center max-w-xl relative">
          <form action="/search" method="GET" className="relative w-full">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for jobs..."
              name="q"
              className="w-full px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            {sugg.length > 0 && (
              <div className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {sugg.map((elem, idx) => (
                  <p
                    key={idx}
                    className="px-4 py-2 hover:bg-emerald-100 cursor-pointer text-sm text-gray-700"
                    onClick={() => setQ(elem.title)}
                  >
                    {elem?.title}
                  </p>
                ))}
              </div>
            )}
          </form>

          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-100 transition"
          >
            Search
          </button>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden sm:flex items-center gap-3">
          {user && (
            <>
              <Link href="/applied-job">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  Applied Job
                </button>
              </Link>
             
                <button onClick={handleLogout} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  LogOut
                </button>
             
            </>
          )}
          <UserDropDown user={user} />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-emerald-600 border-t border-emerald-500 px-4 py-3 space-y-3">
          {/* Mobile Search */}
          <form action="/search" method="GET" className="relative w-full">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for jobs..."
              name="q"
              className="w-full px-3 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            {sugg.length > 0 && (
              <div className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {sugg.map((elem, idx) => (
                  <p
                    key={idx}
                    className="px-4 py-2 hover:bg-emerald-100 cursor-pointer text-sm text-gray-700"
                    onClick={() => {
                      setQ(elem.title);
                      setMenuOpen(false);
                    }}
                  >
                    {elem?.title}
                  </p>
                ))}
              </div>
            )}
          </form>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-2">
            {user && (
              <>
                <Link href="/applied-job" onClick={() => setMenuOpen(false)}>
                  <button className="w-full px-4 py-2 bg-white text-emerald-700 rounded hover:bg-emerald-100 transition">
                    Applied Job
                  </button>
                </Link>
                <Link href="/logout" onClick={() => setMenuOpen(false)}>
                  <button className="w-full px-4 py-2 bg-white text-emerald-700 rounded hover:bg-emerald-100 transition">
                    LogOut
                  </button>
                </Link>
              </>
            )}
            <div className="flex justify-center">
              <UserDropDown user={user} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
