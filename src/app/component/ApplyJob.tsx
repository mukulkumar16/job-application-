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
               className="
              w-full sm:w-auto
              flex items-center justify-center gap-2
              px-5 py-3
              rounded-2xl
              bg-gradient-to-r
              from-blue-500 to-blue-600
              text-white
              font-medium
              shadow-lg
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-300
              disabled:opacity-70
            "
            >
                Apply Now
            </button>
        </div>
    );
}
