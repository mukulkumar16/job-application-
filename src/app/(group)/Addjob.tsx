// @ts-nocheck
'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '../../../generated/prisma';
import { userContext } from './layout';

export default function AddJob() {
  const { user } = useContext(userContext);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [job_location, setJobLocation] = useState('');
  const [job_type, setJobType] = useState('');
  const [empType, setEmpType] = useState('');

  const [loading, setLoading] = useState(false);

  if (!user?.company?.id) {
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
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

        setTitle('');
        setDescription('');
        setSalary('');
        setJobLocation('');
        setJobType('');
        setEmpType('');

        setOpen(false);

        router.refresh();
      } else {
        alert('Failed to save job');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
          w-full sm:w-auto
          px-5 py-2.5
          rounded-xl
          bg-indigo-600
          hover:bg-indigo-700
          text-white
          font-medium
          transition
        "
      >
        Add Job
      </button>

      {/* MODAL */}
      {open && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/50
            backdrop-blur-sm
            overflow-y-auto
          "
        >
          <div
            className="
              min-h-screen
              flex
              items-center
              justify-center
              p-4
            "
          >
            {/* CONTENT */}
            <div
              className="
                w-full
                max-w-2xl
                bg-white
                rounded-2xl
                shadow-2xl
                overflow-hidden
                animate-in fade-in zoom-in-95
              "
            >
              {/* HEADER */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-5 sm:px-6
                  py-4
                  bg-gradient-to-r
                  from-indigo-600
                  to-violet-600
                "
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Create New Job
                  </h2>

                  <p className="text-indigo-100 text-sm mt-1">
                    Add your new job opening
                  </p>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="
                    text-white
                    text-2xl
                    leading-none
                    hover:opacity-80
                  "
                >
                  ×
                </button>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="
                  p-5 sm:p-6
                  space-y-5
                  max-h-[80vh]
                  overflow-y-auto
                "
              >
                {/* TITLE */}
                <InputField
                  label="Job Title"
                  value={title}
                  onChange={setTitle}
                  placeholder="Frontend Developer"
                />

                {/* DESCRIPTION */}
                <TextAreaField
                  label="Job Description"
                  value={description}
                  onChange={setDescription}
                  placeholder="Describe the job role..."
                />

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Salary"
                    type="number"
                    value={salary}
                    onChange={setSalary}
                    placeholder="50000"
                  />

                  <InputField
                    label="Location"
                    value={job_location}
                    onChange={setJobLocation}
                    placeholder="Delhi, India"
                  />
                </div>

                {/* SELECTS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectField
                    label="Employment Type"
                    value={empType}
                    onChange={setEmpType}
                    options={[
                      'Full-time',
                      'Part-time',
                      'Internship',
                      'Contract',
                    ]}
                  />

                  <SelectField
                    label="Job Type"
                    value={job_type}
                    onChange={setJobType}
                    options={[
                      'Remote',
                      'On-site',
                      'Hybrid',
                    ]}
                  />
                </div>

                {/* ACTIONS */}
                <div
                  className="
                    flex
                    flex-col-reverse
                    sm:flex-row
                    justify-end
                    gap-3
                    pt-2
                  "
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="
                      w-full sm:w-auto
                      px-5 py-3
                      rounded-xl
                      border
                      border-slate-300
                      hover:bg-slate-100
                      transition
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full sm:w-auto
                      px-5 py-3
                      rounded-xl
                      bg-indigo-600
                      hover:bg-indigo-700
                      disabled:opacity-50
                      text-white
                      font-semibold
                      transition
                    "
                  >
                    {loading ? 'Saving...' : 'Save Job'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* INPUT */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          px-4
          py-3
          bg-slate-50
          text-slate-700
          placeholder:text-slate-400
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:border-indigo-500
          transition
        "
      />
    </div>
  );
}

/* TEXTAREA */

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <textarea
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          px-4
          py-3
          bg-slate-50
          text-slate-700
          placeholder:text-slate-400
          resize-none
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:border-indigo-500
          transition
        "
      />
    </div>
  );
}

/* SELECT */

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          px-4
          py-3
          bg-slate-50
          text-slate-700
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:border-indigo-500
          transition
        "
      >
        <option value="">Select Option</option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}