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
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const data: Job = {
      title,
      description,
      location: job_location,
      salary: parseInt(salary),
      employment_type: empType,
      job_type,
      company_id: user?.data?.company.id,
    };

    const res = await fetch('http://localhost:3000/api/product', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const reData = await res.json();

    if (!reData) {
      alert('Failed to submit');
      return;
    }

    if (reData.success) {
      alert('Saved successfully');
      router.refresh();
    } else {
      alert('Oops! Something went wrong.');
    }

    setOpen(false);
  }

  return (
    <div>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="text-left p-3 w-full rounded-md text-black hover:bg-green-100 transition"
      >
        Add Job
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
        >
          {/* Modal Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-[95%] max-w-lg z-50"
          >
            <h2 className="text-xl font-bold mb-2">Add Job</h2>
            <p className="text-sm text-gray-600 mb-4">
              Fill in the job details below.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <InputField
                label="Title"
                value={title}
                onChange={setTitle}
                placeholder="Enter job title"
              />
              <InputField
                label="Description"
                value={description}
                onChange={setDescription}
                placeholder="Enter job description"
              />
              <InputField
                label="Salary"
                type="number"
                value={salary}
                onChange={setSalary}
                placeholder="Enter salary"
              />
              <InputField
                label="Job Location"
                value={job_location}
                onChange={setJobLocation}
                placeholder="Enter location"
              />
              <InputField
                label="Employment Type"
                value={empType}
                onChange={setEmpType}
                placeholder="Full-time / Part-time"
              />
              <InputField
                label="Job Type"
                value={job_type}
                onChange={setJobType}
                placeholder="Remote / Onsite / Hybrid"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
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
      <span className="font-medium mb-1">{label}</span>
      <input
        type={type}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
