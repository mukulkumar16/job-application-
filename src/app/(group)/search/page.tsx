// @ts-nocheck
'use client';

import { useSearchParams } from 'next/navigation';
import JobCard from '@/app/component/JobCard';
import { useEffect, useState } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get("q") || "";
  const minParam = parseInt(searchParams.get("min") || "0");
  const maxParam = parseInt(searchParams.get("max") || "1000000");
  const jobType = searchParams.get("jobType") || "";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `/api/search?q=${query}&min=${minParam}&max=${maxParam}&jobType=${jobType}`
        );
        const data = await res.json();
        setJobs(data.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [query, minParam, maxParam, jobType]);

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
        Search Results for: <span className="text-green-600">"{query}"</span>
      </h1>

      {loading ? (
        <div className="text-center text-gray-600">Loading jobs...</div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
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
