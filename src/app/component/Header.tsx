// @ts-nocheck
"use client";

import { useContext, useEffect, useState } from "react";
import { userContext } from "../(group)/layout";
import Link from "next/link";
import UserDropDown from "./UserDropDwon";
import { Menu, X, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const [q, setQ] = useState("");
  const [sugg, setsugg] = useState([]);
  const { user } = useContext(userContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  // async function handleLogout() {
  //   await fetch("/api/logout");
  //   router.push("/");
  // }

  useEffect(() => {
    async function getSugg() {
      const res = await fetch(`/api/search/suggestion?q=${q}`);
      const data = await res.json();
      setsugg(data);
    }

    q ? getSugg() : setsugg([]);
  }, [q]);

  return (
    <header className="w-full backdrop-blur-md bg-emerald-700/90 shadow-lg sticky top-0 z-50 border-b border-emerald-600/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-white tracking-wide hover:opacity-90 transition"
        >
          Jobs <span className="text-yellow-300 drop-shadow">Dekhoo</span>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Search */}
        <div className="hidden sm:flex flex-1 justify-center max-w-xl relative">
          <form
            action="/search"
            method="GET"
            className="relative w-full flex items-center"
          >
            <Search className="absolute left-3 text-gray-500" size={20} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search jobs, categories..."
              name="q"
              className="w-full pl-10 pr-3 py-2 rounded-xl shadow-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
            <button type="submit" className="px-3 py-2 bg-green-300 ml-2 rounded-lg ">search</button>

            {sugg.length > 0 && (
              <div className="absolute bg-white border border-gray-200 w-full mt-1 rounded-xl shadow-xl z-10 max-h-64 overflow-y-auto">
                {sugg.map((elem, i) => (
                  <p
                    key={i}
                    className="px-4 py-2 hover:bg-emerald-100 cursor-pointer text-sm text-gray-700"
                    onClick={() => setQ(elem.title)}
                  >
                    {elem.title}
                  </p>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* RIGHT SECTION (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          {user && (
            <>
              {user?.data?.role === "admin" && (
                <Link href="/applied-job">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow">
                    Applied Jobs
                  </button>
                </Link>
              )}

            </>
          )}

          <UserDropDown user={user} />
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="sm:hidden bg-emerald-700/95 px-4 py-4 space-y-4 animate-slideDown border-t border-emerald-600/50">
          {/* Mobile Search */}
          <form action="/search" method="GET" className="relative w-full">
            <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for jobs"
              name="q"
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 shadow bg-white focus:ring-2 focus:ring-emerald-400"
            />

            {sugg.length > 0 && (
              <div className="absolute bg-white border w-full mt-1 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                {sugg.map((elem, idx) => (
                  <p
                    key={idx}
                    className="px-4 py-2 hover:bg-emerald-100 cursor-pointer text-gray-700"
                    onClick={() => {
                      setQ(elem.title);
                      setMenuOpen(false);
                    }}
                  >
                    {elem.title}
                  </p>
                ))}
              </div>
            )}
          </form>

          {/* Buttons (Mobile) */}
          <div className="flex flex-col gap-3">
            {user && (
              <>
                {user?.data?.role === "admin" && (
                  <Link href="/applied-job" onClick={() => setMenuOpen(false)}>
                    <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow">
                      Applied Jobs
                    </button>
                  </Link>
                )}

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow"
                >
                  Logout
                </button>
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
