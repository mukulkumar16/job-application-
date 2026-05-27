//@ts-nocheck

'use client';

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Trash2,
  Loader2,
  Building2,
  AlertTriangle,
} from "lucide-react";



export default function DeleteCompany({ id }) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);



  async function handleDelete() {

    const confirmDelete = confirm(
      "Are you sure you want to delete your company?"
    );

    if (!confirmDelete) return;



    try {

      setLoading(true);

      const res = await fetch(
        `/api/company/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();



      if (data.success) {

        alert(
          "Company deleted successfully"
        );

        router.refresh();

        router.push("/");

      } else {

        alert(
          data.message ||
          "Failed to delete company"
        );
      }

    } catch (error) {

      alert("Server error");

      console.error(error);

    } finally {

      setLoading(false);
    }
  }



  return (

    <button
      disabled={loading}
      onClick={handleDelete}
      className="
        group
        relative
        overflow-hidden

        flex items-center gap-3

        w-full

        px-4 py-3

        rounded-2xl

        bg-gradient-to-r
        from-red-500/10
        to-rose-500/10

        border border-red-500/20

        text-red-400
        font-semibold
        text-sm

        hover:from-red-500
        hover:to-rose-600
        hover:text-white

        active:scale-[0.98]

        transition-all duration-300

        disabled:opacity-70
      "
    >

      {/* GLOW EFFECT */}
      <div
        className="
          absolute inset-0
          bg-white/10
          opacity-0
          group-hover:opacity-100
          transition
        "
      />



      {/* ICON */}
      <div
        className="
          relative
          w-9 h-9
          rounded-xl

          bg-red-500/20

          flex items-center justify-center

          group-hover:bg-white/20

          transition
        "
      >

        {loading ? (

          <Loader2
            size={18}
            className="animate-spin"
          />

        ) : (

          <Trash2
            size={18}
            className="
              group-hover:rotate-12
              transition-transform
            "
          />

        )}

      </div>



      {/* TEXT */}
      <div
        className="
          relative
          flex flex-col items-start
        "
      >

        <span>
          {loading
            ? "Deleting..."
            : "Delete Company"}
        </span>

        <span
          className="
            text-[11px]
            opacity-80
            font-normal
          "
        >
          Remove permanently
        </span>

      </div>



      {/* WARNING ICON */}
      <AlertTriangle
        size={16}
        className="
          ml-auto
          relative
          opacity-70
          group-hover:opacity-100
          transition
        "
      />

    </button>
  );
}