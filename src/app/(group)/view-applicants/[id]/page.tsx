// @ts-nocheck

"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  Users,
  Trash2,
  Mail,
  User,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function JobApplicantsPage() {

  const jobId = useParams().id;



  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);



  // FETCH APPLICATIONS
  async function loadApplicants() {

    try {

      const res = await fetch(
        `/api/application/${jobId}`
      );

      const data = await res.json();

      if (data.success) {

        setApplications(data.data);

      } else {

        alert("Failed to load applicants");
      }

    } catch (err) {

      console.error(err);

      alert("Server error");

    } finally {

      setLoading(false);
    }
  }



  // DELETE APPLICATION
  async function deleteApplication(id) {

    const confirmDelete = confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;



    try {

      const res = await fetch(
        `/api/application/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {

        setApplications((prev) =>
          prev.filter((app) => app.id !== id)
        );

      } else {

        alert("Failed to delete");
      }

    } catch (err) {

      console.log(err);

      alert("Error deleting application");
    }
  }



  useEffect(() => {

    if (jobId) {
      loadApplicants();
    }

  }, [jobId]);



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

        {/* HEADER */}
        <div
          className="
            relative overflow-hidden
            rounded-[36px]
            border border-slate-800
            bg-slate-950/80
            backdrop-blur-xl
            shadow-2xl
            p-6 md:p-10
            mb-8
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

            {/* BADGE */}
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
              Applicants Dashboard
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
              <div className="flex items-center gap-5">

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
                  <Users
                    className="text-white"
                    size={36}
                  />
                </div>

                <div>

                  <h1
                    className="
                      text-3xl md:text-5xl
                      font-black
                      text-white
                    "
                  >
                    Job Applicants
                  </h1>

                  <p
                    className="
                      text-slate-400
                      mt-3
                    "
                  >
                    Manage applicants for this
                    job posting.
                  </p>

                </div>

              </div>



              {/* COUNT */}
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
                    <Users
                      className="text-white"
                      size={24}
                    />
                  </div>

                  <div>

                    <p className="text-slate-400 text-sm">
                      Total Applicants
                    </p>

                    <h2
                      className="
                        text-3xl
                        font-black
                        text-white
                      "
                    >
                      {applications.length}
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
              py-24
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
              Loading applicants...
            </p>

          </div>

        )}



        {/* NO APPLICANTS */}
        {!loading &&
          applications.length === 0 && (

          <div
            className="
              relative overflow-hidden
              rounded-[32px]
              border border-slate-800
              bg-slate-950/80
              backdrop-blur-xl
              shadow-2xl
              p-12
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
                <Users
                  className="text-white"
                  size={42}
                />
              </div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-white
                "
              >
                No Applicants Found
              </h2>

              <p
                className="
                  text-slate-400
                  mt-4
                  leading-8
                "
              >
                No users have applied for this
                job yet.
              </p>

            </div>

          </div>

        )}



        {/* APPLICANTS LIST */}
        {!loading &&
          applications.length > 0 && (

          <div className="space-y-5">

            {applications.map((app) => (

              <div
                key={app.id}
                className="
                  relative overflow-hidden
                  rounded-[30px]
                  border border-slate-800
                  bg-slate-950/80
                  backdrop-blur-xl
                  shadow-xl
                  p-5 md:p-6
                "
              >

                {/* HOVER GLOW */}
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



                <div
                  className="
                    relative
                    flex flex-col md:flex-row
                    md:items-center
                    md:justify-between
                    gap-5
                  "
                >

                  {/* USER INFO */}
                  <div className="flex items-center gap-5">

                    {/* AVATAR */}
                    <div
                      className="
                        w-16 h-16
                        rounded-3xl
                        bg-gradient-to-br
                        from-cyan-500
                        to-violet-600
                        flex items-center justify-center
                        shadow-lg
                      "
                    >
                      <User
                        className="text-white"
                        size={28}
                      />
                    </div>



                    {/* DETAILS */}
                    <div>

                      <h2
                        className="
                          text-xl
                          font-bold
                          text-white
                        "
                      >
                        {app.user?.name ||
                          "Unknown User"}
                      </h2>

                      <div
                        className="
                          flex items-center gap-2
                          text-slate-400
                          mt-2
                          break-all
                        "
                      >
                        <Mail size={16} />
                        {app.user?.email}
                      </div>

                    </div>

                  </div>



                  {/* DELETE BUTTON */}
                  <button
                    onClick={() =>
                      deleteApplication(app.id)
                    }
                    className="
                      flex items-center justify-center gap-2
                      px-5 py-3
                      rounded-2xl
                      bg-red-500/10
                      border border-red-500/20
                      text-red-400
                      hover:bg-red-500
                      hover:text-white
                      transition-all duration-300
                      w-full md:w-auto
                    "
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}