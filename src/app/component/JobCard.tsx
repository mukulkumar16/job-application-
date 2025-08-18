//@ts-nocheck
import Link from "next/link";




export default function JobCard({ job  } ) {



  return (
    <div className="p-5 border rounded-2xl shadow-md hover:shadow-lg transition bg-white flex flex-col justify-between h-[400px]">
      
   
      <div className="flex items-center gap-4 mb-4">
        
        <div>
         
          <h2 className="text-lg font-bold text-emerald-700">{job.title}</h2>
          <Link href={'/company/'+ job.company.id}> <h2 className="text-sm font-bold text-black">{job.company.name}</h2></Link>
          {/* <p className="text-sm text-red-500">{job.employer_name}</p> */}
        </div>
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-600 line-clamp-4 mb-2">{job.description}</p>
        <p className="text-sm text-gray-500">📍 {job.location}</p>
        <p className="text-sm text-green-600 font-semibold mt-1"> 💰{job.salary || "Salary not mentioned"}</p>
      </div>

    
      
      <Link href={`/job/${job.id}`}>
          <div className="mt-4">
        <button className="w-full py-2 px-4 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition">
          View Deatils
        </button>
      </div>
      </Link>
    </div>
  );
}
