//@ts-nocheck

import JobCard from "@/app/component/JobCard";
import { GetUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";

import {
  Briefcase,
  SearchX,
  Sparkles,
} from "lucide-react";

export default async function page() {

  const user = await GetUserFromCookies();

  // USER NOT FOUND
  if (!user) {
    return (
      <div
        className="
          min-h-screen
          flex items-center justify-center
          bg-gradient-to-br
          from-slate-950
          via-slate-900
          to-slate-950
          px-4
        "
      >

        <div
          className="
            max-w-md w-full
            rounded-3xl
            border border-red-500/20
            bg-slate-950/80
            backdrop-blur-xl
            p-8
            text-center
            shadow-2xl
          "
        >

          <div
            className="
              mx-auto
              w-16 h-16
              rounded-2xl
              bg-gradient-to-br
              from-red-500 to-rose-600
              flex items-center justify-center
              mb-5
            "
          >
            <SearchX className="text-white" size={30} />
          </div>

          <h1 className="text-2xl font-bold text-white">
            User Not Found
          </h1>

          <p className="text-slate-400 mt-3">
            Please login to view your applications.
          </p>

        </div>
      </div>
    );
  }



  // FETCH APPLICATIONS
  const application = await prismaclient.applictaion.findMany({
    where: {
      user_id: user?.id,
    },

    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });



  // NO APPLICATIONS
  if (!application.length) {
    return (
      <div
        className="
          min-h-screen
          flex items-center justify-center
          bg-gradient-to-br
          from-slate-950
          via-slate-900
          to-slate-950
          px-4
        "
      >

        <div
          className="
            max-w-lg w-full
            rounded-[32px]
            border border-slate-800
            bg-slate-950/80
            backdrop-blur-xl
            p-10
            text-center
            shadow-2xl
          "
        >

          <div
            className="
              mx-auto
              w-20 h-20
              rounded-3xl
              bg-gradient-to-br
              from-cyan-500 to-violet-600
              flex items-center justify-center
              mb-6
            "
          >
            <Briefcase
              className="text-white"
              size={36}
            />
          </div>

          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            No Applications Yet
          </h1>

          <p
            className="
              text-slate-400
              mt-4
              leading-7
            "
          >
            You haven't applied to any jobs yet.
            Start exploring opportunities and
            apply to your dream role.
          </p>

        </div>
      </div>
    );
  }



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

        {/* HEADER */}
        <div
          className="
            mb-10
            rounded-[32px]
            border border-slate-800
            bg-slate-950/80
            backdrop-blur-xl
            p-6 md:p-8
            shadow-2xl
            relative overflow-hidden
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

          <div className="relative flex items-center gap-5 flex-wrap">

            <div
              className="
                w-16 h-16
                rounded-3xl
                bg-gradient-to-br
                from-cyan-500 to-violet-600
                flex items-center justify-center
                shadow-xl
              "
            >
              <Sparkles
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
                "
              >
                Your Applications
              </h1>

              <p
                className="
                  text-slate-400
                  mt-2
                "
              >
                Track all the jobs you have applied for.
              </p>

            </div>

          </div>
        </div>



        {/* JOB GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-7
          "
        >

          {application.map((app) => (

            <div
              key={app.id}
              className="
                transition duration-300
                hover:scale-[1.01]
              "
            >
              <JobCard
                key={app.id}
                job={app.job}
              />
            </div>

          ))}

        </div>
      </div>
    </div>
  );
}