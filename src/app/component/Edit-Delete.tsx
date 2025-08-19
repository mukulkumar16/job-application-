// @ts-nocheck
'use client'

import { useContext } from "react"
import { userContext } from "../(group)/layout"
import { useRouter } from "next/navigation"

export default function EditDelete({ job }) {
    const { user } = useContext(userContext);
    const router = useRouter();

    async function handleDelete() {
        try {
            const res = await fetch("/api/product/" + job.id, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.success) {
                alert("Deleted successfully");
                router.refresh(); // Optional: Refresh page to reflect deletion
            } else {
                alert("Something went wrong");
            }
        } catch (err) {
            alert("DB problem");
        }
    }

    function handleEdit() {
        router.push(`/edit-job/${job.id}`); // ✅ Update this path if needed
    }

    if (user?.company?.id === job?.company?.id) {
        return (
            <div className="flex gap-4 mt-4 flex-wrap">
                <button
                    onClick={handleEdit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
                >
                    Delete
                </button>
            </div>
        );
    }

    return null;
}
