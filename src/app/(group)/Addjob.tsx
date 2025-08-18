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
    //   const [price, setPrice] = useState('');
    const [salary, setsalary] = useState('');
    const [job_location, setjob_location] = useState('');
    const [job_type, setjob_type] = useState("");
    const [empType, setempType] = useState("");

    const {user} = useContext(userContext);

    // console.log(user);

    const router = useRouter();

    async function handleSubmit() {

        const data: Job = {

            title: title,
            description: description,
            location: job_location,
            salary: parseInt(salary) ,
            employment_type: empType,
            job_type: job_type,
            company_id  : user?.data?.company.id

        };

        // console.log( data);

        // const res = await addProductToD(data);
        const res = await fetch('http://localhost:3000/api/product', {
            method: "POST",
            body: JSON.stringify(data)
        });

        const reData = await res.json();

        if(!reData){
            alert("not ")
        }
       

        if(reData.success){
            alert("saved successfully");
            router.refresh();
        }
        else{
            alert("oooppsss");
        }



    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className=" text-left p-3 hover:bg-gray-100 hover:border-2-black w-full  rounded-md text-black  ">
                    Add Job
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />

                <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full bg-white p-6 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
                    <Dialog.Title className="text-lg font-bold mb-2">Add job</Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-600 mb-4">
                        Fill in the job details.
                    </Dialog.Description>

                    <div className="flex flex-col gap-4">
                        <label className="flex flex-col">
                            <span className="text-sm font-medium mb-1">Title</span>
                            <input
                                className="border border-gray-300 rounded px-3 py-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter product title"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-sm font-medium mb-1">Description</span>
                            <input
                                className="border border-gray-300 rounded px-3 py-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter product description"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-sm font-medium mb-1">Salary</span>
                            <input
                                type="number"
                                className="border border-gray-300 rounded px-3 py-2"
                                value={salary}
                                onChange={(e) => setsalary(e.target.value)}
                                placeholder="Enter price"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-sm font-medium mb-1">Job location</span>
                            <input
                                className="border border-gray-300 rounded px-3 py-2"
                                value={job_location}
                                onChange={(e) => setjob_location(e.target.value)}
                                placeholder="Enter category"
                            />
                        </label>
                         <label className="flex flex-col">
                            <span className="text-sm font-medium mb-1">Employment Type</span>
                            <input
                                className="border border-gray-300 rounded px-3 py-2"
                                value={empType}
                                onChange={(e) => setempType(e.target.value)}
                                placeholder="Enter Emp type"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-sm font-medium mb-1">job type</span>
                            <input
                                className="border border-gray-300 rounded px-3 py-2"
                                value={job_type}
                                onChange={(e) => setjob_type(e.target.value)}
                                placeholder="Enter image URL"
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