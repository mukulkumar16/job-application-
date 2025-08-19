//@ts-nocheck
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import JobCard from '@/app/component/JobCard';

export default function SearchClient() {
  const searchParams = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = searchParams.get("q") || "";
  const minParam = Number.parseInt(searchParams.get("min") || "0");
  const maxParam = Number.parseInt(searchParams.get("max") || "1000000");
  const jobType = searchParams.get("jobType") || "";

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/search?q=${query}&min=${minParam}&max=${maxParam}&jobType=${jobType}`
        );

        if (!res.ok) {
          throw new Error("Something went wrong while fetching jobs.");
        }

        const dat = await res.json();
        setJobs(dat.data || []);
      } catch (err: any) {
        console.error("Fetch error:", err.message);
        setError(err.message || "Unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [query, minParam, maxParam, jobType]);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h1>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No jobs found for "{query}"</p>
      )}
    </div>
  );
}
