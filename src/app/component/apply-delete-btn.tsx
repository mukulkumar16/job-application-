//@ts-nocheck
'use client'

import { useState } from "react";
import ApplyJob from "./ApplyJob";
import { useRouter } from "next/navigation";

export default function ApplyDelete({ job, userapply }) {

    const router = useRouter();
    const [userHasApplied, setuserHasapplied] = useState(userapply);

    async function handleDeleteApply() {
        try {
            const res = await fetch("http://localhost:3000/api/product/apply/" + job.id, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.success) {
                setuserHasapplied(false);
                router.refresh();
            } else {
                alert("failed");
                setuserHasapplied(true);
                router.refresh();
            }

        } catch (error) {
            alert("error");
        }
    }

    return (
        <div className="mt-4">
            {!userHasApplied && <ApplyJob job={job} />}

            {userHasApplied && (
                <button
                    onClick={handleDeleteApply}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 w-full sm:w-auto"
                >
                    Delete Application
                </button>
            )}
        </div>
    )
}
