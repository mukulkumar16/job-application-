//@ts-nocheck
'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { Job } from '../../../generated/prisma';

export default function Editjob({ job }) {
	const [title, setTitle] = useState(job.title || '');
	const [description, setDescription] = useState(job.description || '');
	const [salary, setsalary] = useState(job.salary || '');
	const [job_location, setjob_location] = useState(job.location || '');
	const [job_type, setjob_type] = useState(job.job_type || '');
	const [empType, setempType] = useState(job.employment_type || '');

	const router = useRouter();

	async function handleSubmit() {
		const data: Job = {
			title,
			description,
			location: job_location,
			salary: parseInt(salary),
			employment_type: empType,
			job_type,
		};

		const res = await fetch(`/api/product/${job.id}`, {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const reData = await res.json();
		if (reData.success) {
			alert('Edit successfully');
			router.refresh();
		} else {
			alert('Something went wrong');
		}
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<button className="px-4 py-2 h-[50px] bg-green-600 text-white rounded hover:bg-green-700">
					Edit Job
				</button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
				<Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90%] sm:max-w-lg bg-white p-6 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
					<Dialog.Title className="text-lg font-bold mb-2">Edit Job</Dialog.Title>
					<Dialog.Description className="text-sm text-gray-600 mb-4">
						Update the job details below.
					</Dialog.Description>

					<div className="flex flex-col gap-4">
						{/* Title */}
						<label className="flex flex-col">
							<span className="text-sm font-medium mb-1">Title</span>
							<input
								className="border border-gray-300 rounded px-3 py-2"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Enter job title"
							/>
						</label>

						{/* Description */}
						<label className="flex flex-col">
							<span className="text-sm font-medium mb-1">Description</span>
							<input
								className="border border-gray-300 rounded px-3 py-2"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Enter job description"
							/>
						</label>

						{/* Salary */}
						<label className="flex flex-col">
							<span className="text-sm font-medium mb-1">Salary</span>
							<input
								type="number"
								className="border border-gray-300 rounded px-3 py-2"
								value={salary}
								onChange={(e) => setsalary(e.target.value)}
								placeholder="Enter salary"
							/>
						</label>

						{/* Job Location */}
						<label className="flex flex-col">
							<span className="text-sm font-medium mb-1">Job Location</span>
							<input
								className="border border-gray-300 rounded px-3 py-2"
								value={job_location}
								onChange={(e) => setjob_location(e.target.value)}
								placeholder="Enter job location"
							/>
						</label>

						{/* Employment Type */}
						<label className="flex flex-col">
							<span className="text-sm font-medium mb-1">Employment Type</span>
							<input
								className="border border-gray-300 rounded px-3 py-2"
								value={empType}
								onChange={(e) => setempType(e.target.value)}
								placeholder="Full-time, Part-time, etc."
							/>
						</label>

						{/* Job Type */}
						<label className="flex flex-col">
							<span className="text-sm font-medium mb-1">Job Type</span>
							<input
								className="border border-gray-300 rounded px-3 py-2"
								value={job_type}
								onChange={(e) => setjob_type(e.target.value)}
								placeholder="Remote, On-site, etc."
							/>
						</label>
					</div>

					<div className="flex justify-end gap-3 mt-6">
						<Dialog.Close asChild>
							<button className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
								Cancel
							</button>
						</Dialog.Close>
						<Dialog.Close asChild>
							<button
								onClick={handleSubmit}
								className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
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
