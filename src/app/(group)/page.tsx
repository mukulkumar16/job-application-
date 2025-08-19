//@ts-nocheck

import prismaclient from "@/services/prisma";
import { Header } from "../component/Header";
import JobCard from "../component/JobCard";
import CompanyReviewAndJobContainer from "../component/Company-review";


export default async function Page() {


  const jobs = await prismaclient.openings.findMany({
    include : {
      company : true
    }
  });
  console.log("jobs ===>>> " , jobs);
  


  return (

    <div>
      


    <div className="p-6">
      
      <h1 className="text-2xl font-bold mb-4">Find Jobs </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobs.map((job, idx) => (
          <JobCard key={idx} job={job} />
        ))}
      </div>
    </div>
    
        </div>
  );
}
