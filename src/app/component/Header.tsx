// @ts-nocheck
'use client'

import { useContext, useEffect, useState } from "react";
import { userContext } from "../(group)/layout";
import Link from "next/link";
import UserDropDown from "./UserDropDwon";

export function Header() {
  const [q, setQ] = useState("");
  const [sugg, setsugg] = useState([]);
  const { user } = useContext(userContext);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        
        
        <Link href="/" className="text-2xl font-extrabold text-white tracking-wide">
          Jobs <span className="text-yellow-300">Dekhoo</span>
        </Link>

        <div className="flex-1 min-w-[250px] max-w-xl relative">
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
        </div>

        
        <button
          type="submit"
          className="px-4 py-2 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-100 transition"
        >
          Search
        </button>

     
        <div className="flex flex-wrap items-center gap-2">
          {user && (
            <Link href="">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                LogOut
              </button>
            </Link>
          )}

          <Link href="/applied-job">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Applied Job
            </button>
          </Link>

          <UserDropDown user={user} />
        </div>
      </div>
    </header>
  );
}
