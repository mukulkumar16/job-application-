// @ts-nocheck
'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '../../../generated/prisma';
import { userContext } from './layout';

export default function AddJob() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [job_location, setJobLocation] = useState('');
  const [job_type, setJobType] = useState('');
  const [empType, setEmpType] = useState('');

  const { user } = useContext(userContext);
  console.log("user from context" , user);
  const router = useRouter();
  if (!user?.company?.id) {
  alert("Company not found");
  return;
}

  async function handleSubmit(e) {
    e.preventDefault();

    const data: Job = {
      title,
      description,
      location: job_location,
      salary: parseInt(salary),
      employment_type: empType,
      job_type,
      company_id: user?.company?.id,
    };

  const res = await fetch('/api/product', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

    const reData = await res.json();

    if (reData?.success) {
      alert('Job Saved Successfully');
      router.refresh();
    } else {
      alert('Failed to save job');
    }

    setOpen(false);
  }

  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={() => setOpen(true)}
        className=" rounded-md text-black"
      >
        Add Job
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 mt-70 z-40 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          {/* Modal Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-[95%] max-w-lg z-50 
              max-h-[90vh] overflow-y-auto 
              animate-fadeIn
            "
          >
            <h2 className="text-2xl font-bold mb-1 text-gray-900">Add Job</h2>
            <p className="text-sm text-gray-600 mb-4">
              Fill in the job details below.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-2">
              <InputField label="Title" value={title} onChange={setTitle} placeholder="Enter job title" />
              <InputField label="Description" value={description} onChange={setDescription} placeholder="Job description" />
              <InputField label="Salary" type="number" value={salary} onChange={setSalary} placeholder="Salary (in numbers)" />
              <InputField label="Job Location" value={job_location} onChange={setJobLocation} placeholder="Enter location" />
              <InputField label="Employment Type" value={empType} onChange={setEmpType} placeholder="Full-time / Part-time" />
              <InputField label="Job Type" value={job_type} onChange={setJobType} placeholder="Remote / Onsite / Hybrid" />

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="flex flex-col text-sm">
      <span className="font-semibold mb-1 text-gray-800">{label}</span>
      <input
        type={type}
        className="
          border border-gray-300 rounded-lg px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-green-500
          transition
        "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
