// @ts-nocheck
import JobCard from '@/app/component/JobCard';
import prismaclient from '@/services/prisma';

export default async function Page({ searchParams }) {
  const query = searchParams.q;
  const minParam = searchParams.min ? Number.parseInt(searchParams.min) : 0;
  const maxParam = searchParams.max ? Number.parseInt(searchParams.max) : 1000000;
  const jobType = searchParams.jobType || "";
  const limit = 10;

  const res = await fetch(
    `http://localhost:3000/api/search?q=${query}&min=${minParam}&max=${maxParam}&jobType=${jobType}`
  );

  const dat = await res.json();
  const jobs = dat.data;

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
        Search Results for: <span className="text-green-600">"{query}"</span>
      </h1>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job: OpeningWithCompany) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-gray-600 text-center mt-8 text-lg">
          No jobs found for <span className="font-semibold">"{query}"</span>
        </div>
      )}
    </div>
  );
}
