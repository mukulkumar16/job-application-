// @ts-nocheck
"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import JobCard from "@/app/component/JobCard";

import {
  Search,
  Briefcase,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function SearchComponent() {

  const searchParams = useSearchParams();

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);



  const query =
    searchParams.get("q") || "";

  const min =
    Number(searchParams.get("min")) || 0;

  const max =
    Number(searchParams.get("max")) || 1000000;

  const jobType =
    searchParams.get("jobType") || "";



  useEffect(() => {

    const fetchJobs = async () => {

      try {

        setLoading(true);

        const res = await fetch(
          `/api/search?q=${query}&min=${min}&max=${max}&jobType=${jobType}`
        );

        const data = await res.json();

        setJobs(data.data || []);

      } catch (err) {

        console.error(
          "Error fetching jobs",
          err
        );

      } finally {

        setLoading(false);
      }
    };

    fetchJobs();

  }, [query, min, max, jobType]);



  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div
        className="
          relative overflow-hidden
          rounded-[32px]
          border border-slate-800
          bg-slate-950/80
          backdrop-blur-xl
          shadow-2xl
          p-6 md:p-8
        "
      >

        {/* GLOW */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-cyan-500/10
            via-transparent
            to-violet-500/10
            pointer-events-none
          "
        />



        <div className="relative">

          {/* TOP BADGE */}
          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2
              rounded-full
              bg-slate-900
              border border-slate-800
              text-cyan-400 text-sm
              mb-6
            "
          >
            <Sparkles size={16} />
            Smart Job Search
          </div>



          <div
            className="
              flex flex-col lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
            "
          >

            {/* LEFT */}
            <div>

              <div className="flex items-center gap-4">

                <div
                  className="
                    w-16 h-16
                    rounded-3xl
                    bg-gradient-to-br
                    from-cyan-500
                    to-violet-600
                    flex items-center justify-center
                    shadow-xl
                  "
                >
                  <Search
                    className="text-white"
                    size={30}
                  />
                </div>

                <div>

                  <h1
                    className="
                      text-3xl md:text-4xl
                      font-black
                      text-white
                      break-words
                    "
                  >
                    Search Results
                  </h1>

                  <p
                    className="
                      text-slate-400
                      mt-2
                      break-words
                    "
                  >
                    Showing results for
                    <span
                      className="
                        text-cyan-400
                        font-semibold
                      "
                    >
                      {" "}
                      "{query || "All Jobs"}"
                    </span>
                  </p>

                </div>

              </div>

            </div>



            {/* RESULT COUNT */}
            <div
              className="
                rounded-3xl
                border border-slate-800
                bg-slate-900/70
                p-5
                min-w-[220px]
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    w-12 h-12
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-500
                    to-violet-600
                    flex items-center justify-center
                  "
                >
                  <Briefcase
                    className="text-white"
                    size={22}
                  />
                </div>

                <div>

                  <p className="text-slate-400 text-sm">
                    Total Jobs
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-black
                      text-white
                    "
                  >
                    {jobs.length}
                  </h2>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>



      {/* LOADING */}
      {loading && (

        <div
          className="
            flex flex-col
            items-center justify-center
            py-20
            text-center
          "
        >

          <Loader2
            size={45}
            className="
              animate-spin
              text-cyan-400
            "
          />

          <p
            className="
              text-slate-400
              mt-5
              text-lg
            "
          >
            Loading jobs...
          </p>

        </div>

      )}



      {/* JOB LIST */}
      {!loading && jobs.length > 0 && (

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >

          {jobs.map((job) => (

            <div key={job.id}>
              <JobCard job={job} />
            </div>

          ))}

        </div>

      )}



      {/* EMPTY STATE */}
      {!loading && jobs.length === 0 && (

        <div
          className="
            relative overflow-hidden
            rounded-[32px]
            border border-slate-800
            bg-slate-950/80
            backdrop-blur-xl
            shadow-2xl
            p-10 md:p-14
            text-center
          "
        >

          {/* GLOW */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-cyan-500/5
              via-transparent
              to-violet-500/5
              pointer-events-none
            "
          />



          <div className="relative">

            <div
              className="
                mx-auto
                w-24 h-24
                rounded-[28px]
                bg-gradient-to-br
                from-cyan-500
                to-violet-600
                flex items-center justify-center
                shadow-2xl
                mb-6
              "
            >
              <Search
                className="text-white"
                size={40}
              />
            </div>



            <h2
              className="
                text-3xl
                font-black
                text-white
              "
            >
              No Jobs Found
            </h2>

            <p
              className="
                text-slate-400
                mt-4
                max-w-xl mx-auto
                leading-8
              "
            >
              No jobs matched your current
              search or filters. Try changing
              the salary range or job type.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}