// @ts-nocheck
import Link from "next/link";
import {
  MapPin,
  IndianRupee,
  Building2,
  ArrowUpRight,
} from "lucide-react";

export default function JobCard({ job }) {

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-slate-800
        bg-slate-950/90
        backdrop-blur-xl
        shadow-xl
        hover:shadow-cyan-500/10
        transition-all duration-300
        hover:-translate-y-1
        w-full
        max-w-sm
        min-h-[380px]
        flex flex-col justify-between
      "
    >

      {/* GLOW EFFECT */}
      <div
        className="
          absolute inset-0
          opacity-0 group-hover:opacity-100
          transition duration-500
          bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5
          pointer-events-none
        "
      />

      <div className="relative p-6 flex flex-col h-full">

        {/* TOP */}
        <div className="flex items-start justify-between gap-4">

          <div className="flex-1">

            {/* JOB TITLE */}
            <h2
              className="
                text-xl font-bold
                text-white
                leading-snug
                line-clamp-2
              "
            >
              {job.title}
            </h2>

            {/* COMPANY */}
            <Link href={`/company/${job.company.id}`}>
              <div
                className="
                  mt-3
                  inline-flex items-center gap-2
                  text-sm text-cyan-400
                  hover:text-cyan-300
                  transition
                "
              >
                <Building2 size={16} />
                <span className="font-medium">
                  {job.company.name}
                </span>
              </div>
            </Link>

          </div>

          {/* ICON BADGE */}
          <div
            className="
              flex items-center justify-center
              w-12 h-12
              rounded-2xl
              bg-gradient-to-br from-cyan-500 to-violet-600
              shadow-lg
            "
          >
            <ArrowUpRight className="text-white" size={22} />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-5 flex-1">

          <p
            className="
              text-sm leading-7
              text-slate-400
              line-clamp-4
            "
          >
            {job.description}
          </p>

          {/* LOCATION */}
          <div
            className="
              flex items-center gap-2
              mt-5
              text-sm text-slate-300
            "
          >
            <MapPin size={16} className="text-cyan-400" />
            <span>{job.location}</span>
          </div>

          {/* SALARY */}
          <div
            className="
              flex items-center gap-2
              mt-3
              text-sm font-semibold
              text-emerald-400
            "
          >
            <IndianRupee size={16} />
            <span>
              {job.salary || "Salary not disclosed"}
            </span>
          </div>

        </div>

        {/* BUTTON */}
        <Link href={`/job/${job.id}`} className="mt-6">
          <button
            className="
              w-full
              py-3 px-5
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-violet-600
              text-white
              font-semibold
              shadow-lg
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-300
            "
          >
            View Details
          </button>
        </Link>

      </div>
    </div>
  );
}