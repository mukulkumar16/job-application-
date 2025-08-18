//@ts-nocheck
import JobCard from '@/app/component/JobCard';
import prismaclient from '@/services/prisma';


export default async function Page({ searchParams } ) {

  const query = searchParams.q;
  const minParam = searchParams.min ? Number.parseInt(searchParams.min) : 0;
  const maxParam = searchParams.max ? Number.parseInt(searchParams.max) : 1000000;
  const jobType = searchParams.jobType || "";
  // const page = searchParams.page ? Number.parseInt(searchParams.page) : 0;

  // console.log(query );
  console.log(minParam);
  console.log(maxParam);
  const limit = 10;


  // const jobs = await prismaclient.openings.findMany({
  //   where: {
  //     title: {
  //       contains: query,
  //       mode: 'insensitive',
  //     },
  //     salary : {
  //       gte : minParam,
  //       lte : maxParam
  //     }
  //   },
    // take : limit,
    // skip : (page-1)*limit
  // });
  // console.log(jobs);

  const res = await fetch(`http://localhost:3000/api/search?q=${query}&min=${minParam}&max=${maxParam}&jobType=${jobType}`)
  // console.log("responce" , res);
  const dat = await res.json();
  const jobs = dat.data;
  // console.log("daata", dat);



  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h1>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {

          jobs.map((job : OpeningWithCompany) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {jobs.length == 0  &&  <p className="text-gray-600">No jobs found for "{query}"</p> }
       
       
      
    </div>
  );
}
