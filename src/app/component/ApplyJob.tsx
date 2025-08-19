//@ts-nocheck
'use client'

export default function ApplyJob({ job }) {

    async function handleClick() {
        try {
            const res = await fetch("/api/product/apply/" + job.id);
            const data = await res.json();

            if (data.success) {
                alert("Applied successfully");
            } else {
                alert("Something went wrong");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="mt-6 flex justify-center sm:justify-start">
            <button
                onClick={handleClick}
                className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 text-sm sm:text-base"
            >
                Apply Now
            </button>
        </div>
    );
}
