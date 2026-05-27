//@ts-nocheck

'use client'

import { useContext, useState } from "react";

import { userContext } from "../(group)/layout";

import { useRouter } from "next/navigation";

import {
  Pencil,
  Trash2,
  Loader2,
  Sparkles,
} from "lucide-react";



export default function EditDelete({ job }) {

  const { user } =
    useContext(userContext);

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);



  // DELETE JOB
  async function handleDelete() {

    const confirmDelete = confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {

      setLoading(true);

      const res = await fetch(
        "/api/product/" + job.id,
        {
          method: "DELETE"
        }
      );

      const data = await res.json();

      if (data.success) {

        alert("Deleted successfully");

        router.refresh();

      } else {

        alert("Something went wrong");
      }

    } catch (err) {

      alert("Database problem");

    } finally {

      setLoading(false);
    }
  }



  // EDIT JOB
  function handleEdit() {

    router.push(`/edit-job/${job.id}`);
  }



  // CHECK OWNER
  if (
    user?.company?.id ===
    job?.company?.id
  ) {

    return (

      <div
        className="
          flex flex-col sm:flex-row
          gap-4
          mt-6
          w-full
        "
      >

        {/* EDIT BUTTON */}
        <button
          onClick={handleEdit}
          className="
            group
            flex items-center justify-center gap-2
            px-6 py-3
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            text-white
            font-semibold
            shadow-lg
            hover:scale-[1.03]
            active:scale-[0.98]
            transition-all duration-300
            w-full sm:w-auto
          "
        >

          <Pencil
            size={18}
            className="
              group-hover:rotate-12
              transition-transform
            "
          />

          Edit Job

        </button>



        {/* DELETE BUTTON */}
        <button
          disabled={loading}
          onClick={handleDelete}
          className="
            group
            flex items-center justify-center gap-2
            px-6 py-3
            rounded-2xl
            bg-gradient-to-r
            from-red-500
            to-rose-600
            text-white
            font-semibold
            shadow-lg
            hover:scale-[1.03]
            active:scale-[0.98]
            transition-all duration-300
            disabled:opacity-70
            w-full sm:w-auto
          "
        >

          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />

              Deleting...
            </>
          ) : (
            <>
              <Trash2
                size={18}
                className="
                  group-hover:rotate-12
                  transition-transform
                "
              />

              Delete Job
            </>
          )}

        </button>



        {/* GLOW EFFECT */}
        <div
          className="
            absolute
            inset-0
            pointer-events-none
            opacity-0
            group-hover:opacity-100
            transition
          "
        >
          <Sparkles />
        </div>

      </div>
    );
  }

  return null;
}