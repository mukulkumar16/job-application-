// @ts-nocheck

import prismaclient from "@/services/prisma";

import Link from "next/link";

import {
  Building2,
  Briefcase,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default async function page() {

  const companies = await prismaclient.company.findMany({
    where: {
      owner: {
        is: {},
      },
    },

    include: {
      owner: true,

      job: {
        select: {
          id: true,
        },
      },
    },
  });



  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        px-4 py-8 md:px-8
      "
    >

      <div className="max-w-7xl mx-auto">

        {/* HERO SECTION */}
        <div
          className="
            relative overflow-hidden
            rounded-[36px]
            border border-slate-800
            bg-slate-950/80
            backdrop-blur-xl
            shadow-2xl
            p-6 md:p-10
            mb-10
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
              Explore Companies
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

                <h1
                  className="
                    text-4xl md:text-5xl
                    font-black
                    text-white
                    leading-tight
                  "
                >
                  Discover Amazing
                  <span
                    className="
                      bg-gradient-to-r
                      from-cyan-400
                      to-violet-500
                      bg-clip-text
                      text-transparent
                    "
                  >
                    {" "}
                    Companies
                  </span>
                </h1>

                <p
                  className="
                    text-slate-400
                    mt-4
                    max-w-2xl
                    leading-8
                  "
                >
                  Explore companies, check active job
                  openings, and find your next career
                  opportunity.
                </p>

              </div>



              {/* RIGHT STATS */}
              <div
                className="
                  rounded-3xl
                  border border-slate-800
                  bg-slate-900/70
                  p-6
                  min-w-[220px]
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-14 h-14
                      rounded-2xl
                      bg-gradient-to-br
                      from-cyan-500
                      to-violet-600
                      flex items-center justify-center
                    "
                  >
                    <Building2
                      className="text-white"
                      size={28}
                    />
                  </div>

                  <div>

                    <p className="text-slate-400 text-sm">
                      Total Companies
                    </p>

                    <h2
                      className="
                        text-3xl
                        font-black
                        text-white
                      "
                    >
                      {companies.length}
                    </h2>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>



        {/* COMPANY GRID */}
        {companies.length > 0 ? (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-7
            "
          >

            {companies.map((comp) => (

              <Link
                key={comp.id}
                href={`/company/${comp.id}`}
                className="group"
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
                    h-full
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-cyan-500/40
                  "
                >

                  {/* HOVER GLOW */}
                  <div
                    className="
                      absolute inset-0
                      opacity-0
                      group-hover:opacity-100
                      transition duration-500
                      bg-gradient-to-br
                      from-cyan-500/5
                      via-transparent
                      to-violet-500/5
                      pointer-events-none
                    "
                  />



                  <div className="relative flex flex-col h-full">

                    {/* TOP */}
                    <div
                      className="
                        flex items-start justify-between
                        gap-4
                      "
                    >

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
                        <Building2
                          className="text-white"
                          size={30}
                        />
                      </div>

                      <div
                        className="
                          w-10 h-10
                          rounded-2xl
                          bg-slate-900
                          border border-slate-800
                          flex items-center justify-center
                          text-slate-400
                          group-hover:text-cyan-400
                          transition
                        "
                      >
                        <ArrowUpRight size={18} />
                      </div>

                    </div>



                    {/* COMPANY INFO */}
                    <div className="mt-6 flex-1">

                      <h2
                        className="
                          text-2xl
                          font-bold
                          text-white
                          line-clamp-1
                        "
                      >
                        {comp.name}
                      </h2>

                      <p
                        className="
                          text-slate-400
                          mt-4
                          leading-7
                          text-sm
                          line-clamp-4
                        "
                      >
                        {comp.description}
                      </p>

                    </div>



                    {/* FOOTER */}
                    <div
                      className="
                        mt-6
                        flex items-center justify-between
                        gap-4
                      "
                    >

                      <div
                        className="
                          flex items-center gap-2
                          text-sm text-slate-300
                        "
                      >
                        <Briefcase
                          size={16}
                          className="text-cyan-400"
                        />

                        {comp.job.length} Jobs
                      </div>



                      <div
                        className="
                          px-4 py-2
                          rounded-2xl
                          bg-slate-900
                          border border-slate-800
                          text-sm text-white
                          group-hover:border-cyan-500/40
                          transition
                        "
                      >
                        View Details
                      </div>

                    </div>

                  </div>
                </div>
              </Link>

            ))}

          </div>

        ) : (

          <div
            className="
              rounded-[32px]
              border border-slate-800
              bg-slate-950/80
              backdrop-blur-xl
              shadow-2xl
              p-10
              text-center
            "
          >

            <div
              className="
                mx-auto
                w-20 h-20
                rounded-3xl
                bg-gradient-to-br
                from-cyan-500
                to-violet-600
                flex items-center justify-center
                mb-6
              "
            >
              <Building2
                className="text-white"
                size={36}
              />
            </div>

            <h2
              className="
                text-3xl
                font-bold
                text-white
              "
            >
              No Companies Found
            </h2>

            <p
              className="
                text-slate-400
                mt-4
              "
            >
              There are currently no companies
              available.
            </p>

          </div>

        )}
      </div>
    </div>
  );
}