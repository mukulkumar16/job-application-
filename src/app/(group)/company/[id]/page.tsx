// @ts-nocheck

import CompanyReviewAndJobContainer from "@/app/component/Company-review";

import {
  Building2,
  Mail,
  Briefcase,
  Sparkles,
} from "lucide-react";

type searchQuery = Promise<{
  id: string;
}>;

export default async function page({
  params,
}: {
  params: searchQuery;
}) {

  const q = await params;

  const id = q.id;



  // FETCH COMPANY
  const res = await fetch(
    "http://localhost:3000/api/company/" + id,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  const company = data.data;

  const owner = data.data.owner;

  const jobs = data.data.job;



  // FETCH REVIEWS
  const res2 = await fetch(
    "http://localhost:3000/api/review/" + id,
    {
      cache: "no-store",
    }
  );

  const data2 = await res2.json();

  const reviews = data2;



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

      <div className="max-w-6xl mx-auto">

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
          "
        >

          {/* BACKGROUND GLOW */}
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
              Company Profile
            </div>



            {/* HEADER */}
            <div
              className="
                flex flex-col lg:flex-row
                lg:items-center
                lg:justify-between
                gap-8
              "
            >

              {/* LEFT */}
              <div className="flex-1">

                <div
                  className="
                    flex items-center gap-5
                    flex-wrap
                  "
                >

                  {/* ICON */}
                  <div
                    className="
                      w-20 h-20
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
                      size={38}
                    />
                  </div>

                  {/* TITLE */}
                  <div>

                    <h1
                      className="
                        text-3xl md:text-5xl
                        font-black
                        text-white
                        break-words
                      "
                    >
                      {company.name}
                    </h1>

                    <p
                      className="
                        text-slate-400
                        mt-2
                        text-sm md:text-base
                      "
                    >
                      Trusted company with active job
                      opportunities.
                    </p>

                  </div>
                </div>



                {/* DESCRIPTION */}
                <div className="mt-8">

                  <h2
                    className="
                      text-lg
                      font-semibold
                      text-white
                      mb-3
                    "
                  >
                    About Company
                  </h2>

                  <p
                    className="
                      text-slate-300
                      leading-8
                      text-[15px] md:text-base
                    "
                  >
                    {company.description}
                  </p>

                </div>

              </div>



              {/* RIGHT STATS */}
              <div
                className="
                  grid grid-cols-1 sm:grid-cols-2
                  lg:grid-cols-1
                  gap-4
                  w-full lg:w-[280px]
                "
              >

                {/* OWNER */}
                <div
                  className="
                    rounded-3xl
                    border border-slate-800
                    bg-slate-900/70
                    p-5
                  "
                >

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        w-12 h-12
                        rounded-2xl
                        bg-gradient-to-br
                        from-cyan-500
                        to-blue-600
                        flex items-center justify-center
                      "
                    >
                      <Mail
                        className="text-white"
                        size={20}
                      />
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm">
                        Owner Email
                      </p>

                      <p
                        className="
                          text-white
                          text-sm
                          break-all
                        "
                      >
                        {owner.email}
                      </p>
                    </div>

                  </div>

                </div>



                {/* JOB COUNT */}
                <div
                  className="
                    rounded-3xl
                    border border-slate-800
                    bg-slate-900/70
                    p-5
                  "
                >

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        w-12 h-12
                        rounded-2xl
                        bg-gradient-to-br
                        from-violet-500
                        to-indigo-600
                        flex items-center justify-center
                      "
                    >
                      <Briefcase
                        className="text-white"
                        size={20}
                      />
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm">
                        Total Jobs
                      </p>

                      <p
                        className="
                          text-white
                          text-lg
                          font-bold
                        "
                      >
                        {jobs?.length || 0}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>



        {/* REVIEW + JOB SECTION */}
        <div className="mt-8">

          <CompanyReviewAndJobContainer
            Reviews={reviews}
            company={company}
          />

        </div>

      </div>
    </div>
  );
}