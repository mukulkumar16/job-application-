// @ts-nocheck

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobApplicantsPage() {
 const jobId = useParams().id;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Applications
  async function loadApplicants() {
    try {
      const res = await fetch(`/api/application/${jobId}`);
      const data = await res.json();

      if (data.success) {
        setApplications(data.data);
      } else {
        alert("Failed to load applicants");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
    setLoading(false);
  }

  // Delete Application
  async function deleteApplication(id) {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/application/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Deleted successfully");

        // Remove from UI without reload
        setApplications((prev) => prev.filter((app) => app.id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      alert("Error deleting application");
    }
  }

  useEffect(() => {
    if (jobId) loadApplicants();
  }, [jobId]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Job Applicants</h1>

      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="mt-4 text-gray-500">No applications found.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{app.user?.name}</p>
                <p className="text-gray-500">{app.user?.email}</p>
              </div>

              <button
                onClick={() => deleteApplication(app.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
