//@ts-nocheck
'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import {
  Pencil,
  X,
  Briefcase,
  MapPin,
  IndianRupee,
  FileText,
  Building2,
  Laptop,
  Loader2,
  Sparkles,
} from 'lucide-react';

export default function Editjob({ job }) {

  const [title, setTitle] =
    useState(job.title || '');

  const [description, setDescription] =
    useState(job.description || '');

  const [salary, setsalary] =
    useState(job.salary || '');

  const [job_location, setjob_location] =
    useState(job.location || '');

  const [job_type, setjob_type] =
    useState(job.job_type || '');

  const [empType, setempType] =
    useState(job.employment_type || '');

  const [loading, setLoading] =
    useState(false);

  const router = useRouter();



  async function handleSubmit() {

    try {

      setLoading(true);

      const data = {
        title,
        description,
        location: job_location,
        salary: parseInt(salary),
        employment_type: empType,
        job_type,
      };

      const res = await fetch(
        `/api/product/${job.id}`,
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      );

      const reData = await res.json();

      if (reData.success) {

        alert('Job updated successfully');

        router.refresh();

      } else {

        alert('Something went wrong');
      }

    } catch (error) {

      console.log(error);
      alert('Error updating job');

    } finally {

      setLoading(false);
    }
  }



  return (

    <Dialog.Root>

      {/* OPEN BUTTON */}
      <Dialog.Trigger asChild>

        <button
          className="
            group
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

          <Pencil
            size={18}
            className="group-hover:rotate-12 transition"
          />

          Edit Job

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
            top-1/2 left-1/2
            z-50
            w-[95vw]
            sm:w-[90vw]
            max-w-2xl
            max-h-[90vh]
            overflow-y-auto
            rounded-[32px]
            border border-slate-800
            bg-slate-950/95
            backdrop-blur-2xl
            shadow-2xl
            -translate-x-1/2
            -translate-y-1/2
          "
        >

          {/* BACKGROUND GLOW */}
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



          <div className="relative p-6 md:p-8">

            {/* HEADER */}
            <div
              className="
                flex items-start justify-between
                mb-8
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
                    Edit Job
                  </Dialog.Title>

                  <Dialog.Description
                    className="
                      text-slate-400
                      mt-1
                    "
                  >
                    Update your job details professionally
                  </Dialog.Description>

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



            {/* FORM */}
            <div className="space-y-5">

              {/* TITLE */}
              <div>

                <label
                  className="
                    flex items-center gap-2
                    text-sm font-semibold
                    text-slate-300
                    mb-2
                  "
                >

                  <Briefcase size={16} />
                  Job Title

                </label>

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Frontend Developer"
                  className="
                    w-full
                    px-4 py-3
                    rounded-2xl
                    bg-slate-900/80
                    border border-slate-800
                    text-white
                    placeholder:text-slate-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-500
                    transition
                  "
                />

              </div>



              {/* DESCRIPTION */}
              <div>

                <label
                  className="
                    flex items-center gap-2
                    text-sm font-semibold
                    text-slate-300
                    mb-2
                  "
                >

                  <FileText size={16} />
                  Description

                </label>

                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Write job description..."
                  className="
                    w-full
                    px-4 py-3
                    rounded-2xl
                    bg-slate-900/80
                    border border-slate-800
                    text-white
                    placeholder:text-slate-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-500
                    transition
                    resize-none
                  "
                />

              </div>



              {/* GRID */}
              <div
                className="
                  grid grid-cols-1
                  md:grid-cols-2
                  gap-5
                "
              >

                {/* SALARY */}
                <div>

                  <label
                    className="
                      flex items-center gap-2
                      text-sm font-semibold
                      text-slate-300
                      mb-2
                    "
                  >

                    <IndianRupee size={16} />
                    Salary

                  </label>

                  <input
                    type="number"
                    value={salary}
                    onChange={(e) =>
                      setsalary(e.target.value)
                    }
                    placeholder="50000"
                    className="
                      w-full
                      px-4 py-3
                      rounded-2xl
                      bg-slate-900/80
                      border border-slate-800
                      text-white
                      placeholder:text-slate-500
                      focus:outline-none
                      focus:ring-2
                      focus:ring-cyan-500
                      transition
                    "
                  />

                </div>



                {/* LOCATION */}
                <div>

                  <label
                    className="
                      flex items-center gap-2
                      text-sm font-semibold
                      text-slate-300
                      mb-2
                    "
                  >

                    <MapPin size={16} />
                    Location

                  </label>

                  <input
                    value={job_location}
                    onChange={(e) =>
                      setjob_location(
                        e.target.value
                      )
                    }
                    placeholder="Delhi, India"
                    className="
                      w-full
                      px-4 py-3
                      rounded-2xl
                      bg-slate-900/80
                      border border-slate-800
                      text-white
                      placeholder:text-slate-500
                      focus:outline-none
                      focus:ring-2
                      focus:ring-cyan-500
                      transition
                    "
                  />

                </div>



                {/* EMPLOYMENT TYPE */}
                <div>

                  <label
                    className="
                      flex items-center gap-2
                      text-sm font-semibold
                      text-slate-300
                      mb-2
                    "
                  >

                    <Building2 size={16} />
                    Employment Type

                  </label>

                  <input
                    value={empType}
                    onChange={(e) =>
                      setempType(
                        e.target.value
                      )
                    }
                    placeholder="Full-Time"
                    className="
                      w-full
                      px-4 py-3
                      rounded-2xl
                      bg-slate-900/80
                      border border-slate-800
                      text-white
                      placeholder:text-slate-500
                      focus:outline-none
                      focus:ring-2
                      focus:ring-cyan-500
                      transition
                    "
                  />

                </div>



                {/* JOB TYPE */}
                <div>

                  <label
                    className="
                      flex items-center gap-2
                      text-sm font-semibold
                      text-slate-300
                      mb-2
                    "
                  >

                    <Laptop size={16} />
                    Job Type

                  </label>

                  <input
                    value={job_type}
                    onChange={(e) =>
                      setjob_type(
                        e.target.value
                      )
                    }
                    placeholder="Remote / Hybrid"
                    className="
                      w-full
                      px-4 py-3
                      rounded-2xl
                      bg-slate-900/80
                      border border-slate-800
                      text-white
                      placeholder:text-slate-500
                      focus:outline-none
                      focus:ring-2
                      focus:ring-cyan-500
                      transition
                    "
                  />

                </div>

              </div>

            </div>



            {/* ACTION BUTTONS */}
            <div
              className="
                flex flex-col-reverse
                sm:flex-row
                justify-end
                gap-4
                mt-8
              "
            >

              {/* CANCEL */}
              <Dialog.Close asChild>

                <button
                  className="
                    px-6 py-3
                    rounded-2xl
                    bg-slate-900
                    border border-slate-800
                    text-slate-300
                    hover:bg-slate-800
                    transition
                  "
                >
                  Cancel
                </button>

              </Dialog.Close>



              {/* SAVE */}
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="
                  flex items-center justify-center gap-2
                  px-6 py-3
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
                  disabled:opacity-70
                "
              >

                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Pencil size={18} />
                    Save Changes
                  </>
                )}

              </button>

            </div>

          </div>

        </Dialog.Content>

      </Dialog.Portal>

    </Dialog.Root>
  );
}