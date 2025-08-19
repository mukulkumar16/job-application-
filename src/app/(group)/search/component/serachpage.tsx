// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import JobCard from "@/app/component/JobCard";

export default function SearchComponent() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState([]);

  const query = searchParams.get("q") || "";
  const min = Number(searchParams.get("min")) || 0;
  const max = Number(searchParams.get("max")) || 1000000;
  const jobType = searchParams.get("jobType") || "";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/search?q=${query}&min=${min}&max=${max}&jobType=${jobType}`
        );
        const data = await res.json();
        setJobs(data.data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };

    fetchJobs();
  }, [query, min, max, jobType]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {jobs.length === 0 && (
        <p className="text-gray-600">No jobs found for "{query}"</p>
      )}
    </div>
  );
}
