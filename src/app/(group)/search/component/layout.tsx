// @ts-nocheck
"use client";

import { useState } from "react";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";

import {
  Briefcase,
  IndianRupee,
  Sparkles,
  Filter,
} from "lucide-react";

export default function Layout({ children }) {

  const searchParams = useSearchParams();

  const searchterm = searchParams.get("q");

  const minAm = searchParams.get("min");

  const maxAm = searchParams.get("max");

  const jobTypeQuery =
    searchParams.get("jobType");



  const [min, setMin] = useState(minAm || "");

  const [max, setMax] = useState(maxAm || "");

  const [jobType, setJobType] = useState(
    jobTypeQuery || ""
  );



  const router = useRouter();



  function handleSubmit(e) {

    e.preventDefault();

    let url = "/search?";

    if (searchterm) {
      url += `q=${searchterm}`;
    }

    if (min) {
      url += `&min=${min}`;
    }

    if (max) {
      url += `&max=${max}`;
    }

    if (jobType) {
      url += `&jobType=${jobType}`;
    }

    router.push(url);
  }



  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        px-4 py-6 md:px-8
      "
    >

      <div
        className="
          max-w-7xl mx-auto
          flex flex-col lg:flex-row
          gap-8
        "
      >

        {/* FILTER SIDEBAR */}
        <div
          className="
            w-full lg:w-[320px]
            lg:sticky lg:top-24
            h-fit
          "
        >

          <div
            className="
              relative overflow-hidden
              rounded-[32px]
              border border-slate-800
              bg-slate-950/80
              backdrop-blur-xl
              shadow-2xl
              p-6
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



            <div className="relative">

              {/* HEADER */}
              <div className="mb-8">

                <div
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2
                    rounded-full
                    bg-slate-900
                    border border-slate-800
                    text-cyan-400 text-sm
                    mb-5
                  "
                >
                  <Sparkles size={16} />
                  Smart Filters
                </div>

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-14 h-14
                      rounded-2xl
                      bg-gradient-to-br
                      from-cyan-500
                      to-violet-600
                      flex items-center justify-center
                      shadow-xl
                    "
                  >
                    <Filter
                      className="text-white"
                      size={26}
                    />
                  </div>

                  <div>

                    <h1
                      className="
                        text-2xl
                        font-black
                        text-white
                      "
                    >
                      Find Jobs
                    </h1>

                    <p
                      className="
                        text-slate-400
                        text-sm mt-1
                      "
                    >
                      Filter opportunities easily
                    </p>

                  </div>

                </div>

              </div>



              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="space-y-7"
              >

                {/* SALARY */}
                <div>

                  <div
                    className="
                      flex items-center gap-2
                      mb-4
                      text-slate-300
                      font-medium
                    "
                  >
                    <IndianRupee
                      size={18}
                      className="text-emerald-400"
                    />
                    Salary Range
                  </div>

                  <div
                    className="
                      flex flex-col sm:flex-row
                      gap-4
                    "
                  >

                    <input
                      type="number"
                      value={min}
                      onChange={(e) =>
                        setMin(e.target.value)
                      }
                      placeholder="Min Salary"
                      className="
                        w-full
                        px-4 py-3
                        rounded-2xl
                        border border-slate-700
                        bg-slate-900/80
                        text-white
                        placeholder:text-slate-500
                        outline-none
                        focus:border-cyan-400
                        focus:ring-2
                        focus:ring-cyan-500/20
                        transition
                      "
                    />



                    <input
                      type="number"
                      value={max}
                      onChange={(e) =>
                        setMax(e.target.value)
                      }
                      placeholder="Max Salary"
                      className="
                        w-full
                        px-4 py-3
                        rounded-2xl
                        border border-slate-700
                        bg-slate-900/80
                        text-white
                        placeholder:text-slate-500
                        outline-none
                        focus:border-cyan-400
                        focus:ring-2
                        focus:ring-cyan-500/20
                        transition
                      "
                    />

                  </div>
                </div>



                {/* JOB TYPE */}
                <div>

                  <div
                    className="
                      flex items-center gap-2
                      mb-4
                      text-slate-300
                      font-medium
                    "
                  >
                    <Briefcase
                      size={18}
                      className="text-violet-400"
                    />
                    Job Type
                  </div>

                  <div className="space-y-3">

                    {[
                      "on-site",
                      "remote",
                      "hybrid",
                    ].map((type) => (

                      <label
                        key={type}
                        className="
                          flex items-center gap-3
                          rounded-2xl
                          border border-slate-800
                          bg-slate-900/60
                          px-4 py-3
                          cursor-pointer
                          hover:border-cyan-500/40
                          transition
                        "
                      >

                        <input
                          className="
                            h-4 w-4
                            accent-cyan-500
                          "
                          type="radio"
                          name="jobType"
                          value={type}
                          checked={
                            jobType === type
                          }
                          onChange={(e) =>
                            setJobType(
                              e.target.value
                            )
                          }
                        />

                        <span
                          className="
                            capitalize
                            text-slate-200
                          "
                        >
                          {type}
                        </span>

                      </label>

                    ))}

                  </div>
                </div>



                {/* BUTTON */}
                <button
                  type="submit"
                  className="
                    w-full
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
                  "
                >
                  Apply Filters
                </button>

              </form>
            </div>
          </div>
        </div>



        {/* CONTENT */}
        <div className="flex-1">
          {children}
        </div>

      </div>
    </div>
  );
}