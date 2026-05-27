// @ts-nocheck

'use client'

import * as Dialog from '@radix-ui/react-dialog';

import { useEffect, useState } from 'react';

import {
  Users,
  Trash2,
  Mail,
  X,
  Loader2,
  Sparkles,
  User,
} from 'lucide-react';

export default function ViewJobApplicant({ job }) {

  const [applicants, setApplicants] =
    useState([]);

  const [loading, setLoading] =
    useState(true);



  // DELETE APPLICANT
  async function handleDelete(id: string) {

    try {

      const res = await fetch(
        `/api/application/${id}`,
        {
          method: 'DELETE',
        }
      );

      const data = await res.json();

      if (data.success) {

        setApplicants((prev) =>
          prev.filter(
            (app) => app.id !== id
          )
        );
      }

    } catch (error) {

      console.error(
        'Failed to delete applicant:',
        error
      );
    }
  }



  // FETCH APPLICANTS
  useEffect(() => {

    async function GetApplicants() {

      try {

        setLoading(true);

        const res = await fetch(
          `/api/application/${job.id}`
        );

        const data = await res.json();

        if (data.success) {

          setApplicants(data.data);
        }

      } catch (error) {

        console.error(
          'Failed to fetch applicants:',
          error
        );

      } finally {

        setLoading(false);
      }
    }

    GetApplicants();

  }, [job.id]);



  return (

    <Dialog.Root>

      {/* OPEN BUTTON */}
      <Dialog.Trigger asChild>

        <button
          className="
            flex items-center gap-2
            px-5 py-3
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-violet-600
            text-white
            font-semibold
            shadow-lg
            hover:scale-[1.03]
            active:scale-[0.98]
            transition-all duration-300
          "
        >

          <Users size={18} />
          View Applicants

        </button>

      </Dialog.Trigger>



      <Dialog.Portal>

        {/* OVERLAY */}
        <Dialog.Overlay
          className="
            fixed inset-0
            bg-black/70
            backdrop-blur-sm
            z-40
          "
        />



        {/* MODAL */}
        <Dialog.Content
          className="
            fixed
            z-50
            top-1/2 left-1/2
            w-[95vw]
            max-w-2xl
            max-h-[85vh]
            overflow-hidden
            rounded-[32px]
            border border-slate-800
            bg-slate-950/95
            backdrop-blur-2xl
            shadow-2xl
            -translate-x-1/2
            -translate-y-1/2
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
            <div
              className="
                flex items-center justify-between
                p-6 md:p-8
                border-b border-slate-800
              "
            >

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
                  <Sparkles
                    className="text-white"
                    size={28}
                  />
                </div>

                <div>

                  <Dialog.Title
                    className="
                      text-2xl md:text-3xl
                      font-black
                      text-white
                    "
                  >
                    Job Applicants
                  </Dialog.Title>

                  <p
                    className="
                      text-slate-400
                      mt-1
                    "
                  >
                    Total Applicants:
                    <span
                      className="
                        text-cyan-400
                        font-semibold
                        ml-1
                      "
                    >
                      {applicants.length}
                    </span>
                  </p>

                </div>

              </div>



              {/* CLOSE BUTTON */}
              <Dialog.Close asChild>

                <button
                  className="
                    w-11 h-11
                    rounded-2xl
                    bg-slate-900
                    border border-slate-800
                    flex items-center justify-center
                    text-slate-400
                    hover:text-white
                    hover:border-cyan-500
                    transition-all
                  "
                >
                  <X size={22} />
                </button>

              </Dialog.Close>

            </div>



            {/* CONTENT */}
            <div
              className="
                p-6 md:p-8
                max-h-[60vh]
                overflow-y-auto
              "
            >

              {/* LOADING */}
              {loading && (

                <div
                  className="
                    flex flex-col
                    items-center justify-center
                    py-20
                  "
                >

                  <Loader2
                    size={40}
                    className="
                      animate-spin
                      text-cyan-400
                    "
                  />

                  <p
                    className="
                      text-slate-400
                      mt-4
                    "
                  >
                    Loading applicants...
                  </p>

                </div>

              )}



              {/* APPLICANTS */}
              {!loading &&
                applicants.length > 0 && (

                <div className="space-y-5">

                  {applicants.map((app) => (

                    <div
                      key={app.id}
                      className="
                        relative overflow-hidden
                        rounded-[26px]
                        border border-slate-800
                        bg-slate-900/70
                        p-5
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



                      <div
                        className="
                          relative
                          flex flex-col md:flex-row
                          md:items-center
                          md:justify-between
                          gap-5
                        "
                      >

                        {/* USER */}
                        <div className="flex items-center gap-4">

                          <div
                            className="
                              w-14 h-14
                              rounded-2xl
                              bg-gradient-to-br
                              from-cyan-500
                              to-violet-600
                              flex items-center justify-center
                              shadow-lg
                            "
                          >
                            <User
                              className="text-white"
                              size={24}
                            />
                          </div>



                          <div>

                            <h3
                              className="
                                text-lg
                                font-bold
                                text-white
                              "
                            >
                              {app.user?.name ||
                                "Unknown User"}
                            </h3>

                            <div
                              className="
                                flex items-center gap-2
                                text-slate-400
                                text-sm
                                mt-1
                                break-all
                              "
                            >
                              <Mail size={15} />
                              {app.user?.email}
                            </div>

                          </div>

                        </div>



                        {/* DELETE BUTTON */}
                        <button
                          onClick={() =>
                            handleDelete(
                              app.id
                            )
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



              {/* EMPTY STATE */}
              {!loading &&
                applicants.length === 0 && (

                <div
                  className="
                    flex flex-col
                    items-center justify-center
                    py-20
                    text-center
                  "
                >

                  <div
                    className="
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
                      size={40}
                    />
                  </div>

                  <h2
                    className="
                      text-2xl
                      font-black
                      text-white
                    "
                  >
                    No Applicants Yet
                  </h2>

                  <p
                    className="
                      text-slate-400
                      mt-3
                      max-w-md
                    "
                  >
                    Nobody has applied for
                    this job yet.
                  </p>

                </div>

              )}

            </div>

          </div>

        </Dialog.Content>

      </Dialog.Portal>

    </Dialog.Root>
  );
}