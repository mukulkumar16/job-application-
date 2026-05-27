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

  async function handleLogout() {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        router.refresh();
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getSugg() {
      const res = await fetch(`/api/search/suggestion?q=${q}`);
      const data = await res.json();
      setsugg(data);
    }

    q ? getSugg() : setsugg([]);
  }, [q]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/40 bg-slate-950/80 backdrop-blur-xl shadow-lg">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between gap-4 py-4">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-1 text-2xl font-black tracking-tight"
          >
            <span className="text-white">Jobs</span>
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Dekhoo
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 justify-center max-w-2xl relative">
            <form
              action="/search"
              method="GET"
              className="relative w-full flex items-center"
            >
              <Search
                className="absolute left-4 text-slate-400"
                size={18}
              />

              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search jobs, companies, categories..."
                name="q"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 text-white border border-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-400"
              />

              <button
                type="submit"
                className="ml-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:scale-[1.03] transition-all duration-300 shadow-lg"
              >
                Search
              </button>

              {/* Suggestions */}
              {sugg.length > 0 && (
                <div className="absolute top-16 w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50">
                  {sugg.map((elem, i) => (
                    <p
                      key={i}
                      className="px-4 py-3 text-sm text-slate-200 hover:bg-slate-800 cursor-pointer transition"
                      onClick={() => setQ(elem.title)}
                    >
                      {elem.title}
                    </p>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* RIGHT SECTION */}
          <div className="hidden md:flex items-center gap-3">

            {user && (
              <>
                {user?.data?.role === "admin" && (
                  <Link href="/applied-job">
                    <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium hover:scale-105 transition-all shadow-lg">
                      Applied Jobs
                    </button>
                  </Link>
                )}
              </>
            )}

            <UserDropDown user={user} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl animate-in slide-in-from-top duration-300">
          
          <div className="px-4 py-5 space-y-5">

            {/* Mobile Search */}
            <form
              action="/search"
              method="GET"
              className="relative"
            >
              <Search
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />

              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search jobs..."
                name="q"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 text-white border border-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 placeholder:text-slate-400"
              />

              {sugg.length > 0 && (
                <div className="absolute mt-2 w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl z-50">
                  {sugg.map((elem, idx) => (
                    <p
                      key={idx}
                      className="px-4 py-3 text-sm text-slate-200 hover:bg-slate-800 cursor-pointer transition"
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

            {/* Mobile Buttons */}
            <div className="flex flex-col gap-3">

              {user && (
                <>
                  {user?.data?.role === "admin" && (
                    <Link
                      href="/applied-job"
                      onClick={() => setMenuOpen(false)}
                    >
                      <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium shadow-lg">
                        Applied Jobs
                      </button>
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-medium shadow-lg"
                  >
                    Logout
                  </button>
                </>
              )}

              <div className="flex justify-center pt-2">
                <UserDropDown user={user} />
              </div>

            </div>

          </div>
        </div>
      )}
    </header>
  );
}