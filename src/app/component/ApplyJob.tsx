//@ts-nocheck
'use client'
export default function ApplyJob({job}) {

    async function handleClick(){
        try{
            const res = await fetch("/api/product/apply/" + job.id);
            const data = await res.json();
            if(data.success){
                alert("applied successfully");
            }
            else {
                alert("something wents wrong");
            }

        }
        catch(err){
            console.error(err);
        }


    }
    return (
        <div>
            <div className="mt-6">
                <button onClick={handleClick} className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition">
                    Apply Now
                </button>

            </div>
        </div>
    )
}