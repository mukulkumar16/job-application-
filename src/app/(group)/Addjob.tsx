//@ts-nocheck
'use client';

import { addProductToD } from '@/app/action/prodaction';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '../../../generated/prisma';
import { userContext } from './layout';

export default function Addjob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setsalary] = useState('');
  const [job_location, setjob_location] = useState('');
  const [job_type, setjob_type] = useState('');
  const [empType, setempType] = useState('');

  const { user } = useContext(userContext);
  const router = useRouter();

  async function handleSubmit() {
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
    }

    if (reData.success) {
      alert('Saved successfully');
      router.refresh();
    } else {
      alert('Oops! Something went wrong.');
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-left p-3 w-full rounded-md text-black hover:bg-green-100 transition">
          Add Job
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />

        <Dialog.Content className="fixed top-1/2 left-1/2 w-[95%] max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Dialog.Title className="text-xl font-bold mb-2">Add Job</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 mb-4">
            Fill in the job details below.
          </Dialog.Description>

          <div className="flex flex-col gap-4">
            <InputField label="Title" value={title} onChange={setTitle} placeholder="Enter job title" />
            <InputField label="Description" value={description} onChange={setDescription} placeholder="Enter job description" />
            <InputField label="Salary" type="number" value={salary} onChange={setsalary} placeholder="Enter salary" />
            <InputField label="Job Location" value={job_location} onChange={setjob_location} placeholder="Enter location" />
            <InputField label="Employment Type" value={empType} onChange={setempType} placeholder="Full-time / Part-time" />
            <InputField label="Job Type" value={job_type} onChange={setjob_type} placeholder="Remote / Onsite / Hybrid" />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Dialog.Close asChild>
              <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
              >
                Save
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
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
