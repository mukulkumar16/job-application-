//@ts-nocheck
'use client'

import { useEffect, useState } from "react";
import ApplyJob from "./ApplyJob";
import { useRouter } from "next/navigation";

export default function ApplyDelete({ job, userapply }) {

    const router = useRouter();

    const [userHasApplied, setuserHasapplied] = useState(userapply);

    useEffect(() => {
        async function hasApplied() {
            const res = await fetch("/api/product/hasapplied/" + job.id);
            const data = await res.json();
            setuserHasapplied(data.applied);
        }

        hasApplied();
    }, [job.id]);

    async function handleDeleteApply() {
        try {
            const res = await fetch("/api/product/apply/" + job.id, {
                method: "DELETE"
            });

            const data = await res.json();

            if (data.success) {
                setuserHasapplied(false);
                router.refresh();
            }

        } catch (error) {
            alert("error");
        }
    }

    return (
        <div className="mt-4">

            {!userHasApplied && (
                <ApplyJob job={job} />
            )}

            {userHasApplied && (
                <button
                    onClick={handleDeleteApply}
                     className="
              w-full sm:w-auto
              flex items-center justify-center gap-2
              px-5 py-3
              rounded-2xl
              bg-gradient-to-r
              from-rose-500 to-red-600
              text-white
              font-medium
              shadow-lg
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-300
              disabled:opacity-70
            "
          
                >
                    Delete Application
                </button>
            )}

        </div>
    )
}