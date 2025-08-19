// @ts-nocheck
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Layout({ children }) {
  const searchparams = useSearchParams();
  const searchterm = searchparams.get("q");
  const minAm = searchparams.get("min");
  const maxAm = searchparams.get("max");
  const jobTypeQuery = searchparams.get("jobType");

  const [min, setMin] = useState(minAm || "");
  const [max, setMax] = useState(maxAm || "");
  const [jobType, setJobType] = useState(jobTypeQuery || "");

  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    let url = "/search?";

    if (searchterm) url += `q=${searchterm}`;
    if (min) url += `&min=${min}`;
    if (max) url += `&max=${max}`;
    if (jobType) url += `&jobType=${jobType}`;

    router.push(url);
  }

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar / Filter */}
        <div className="w-full lg:w-[300px] bg-blue-100 rounded-lg p-4 font-semibold">
          <h1 className="text-xl font-bold mb-4 text-center lg:text-left">Find Jobs</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Salary Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="Min Salary"
                className="p-2 rounded-lg border border-green-600 w-full"
              />
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="Max Salary"
                className="p-2 rounded-lg border border-green-600 w-full"
              />
            </div>

            {/* Job Type Radio Buttons */}
            <div>
              <h2 className="pt-2 pb-1 text-center sm:text-left">Job Type</h2>
              <div className="space-y-2">
                {["on-site", "remote", "hybrid"].map((type) => (
                  <div className="flex items-center gap-2" key={type}>
                    <input
                      className="h-4 w-4"
                      type="radio"
                      name="jobType"
                      value={type}
                      checked={jobType === type}
                      onChange={(e) => setJobType(e.target.value)}
                    />
                    <label className="capitalize">{type}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Apply Filters
            </button>
          </form>
        </div>

        {/* Children Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
