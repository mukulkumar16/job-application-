//@ts-nocheck
'use client';

import { useState } from 'react';
import { Header } from '@/app/component/Header';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Layout({ children }) {
  const searchparams = useSearchParams();
  const searchterm = searchparams.get('q');
  const minAm = searchparams.get('min');
  const maxAm = searchparams.get('max');

  const [min, setmin] = useState(minAm || '');
  const [max, setmax] = useState(maxAm || '');
  const [jobType , setJobType] = useState("");

  const router = useRouter();

  function handlemin(event) {
    setmin(event.target.value);
  }

  function handlemax(event) {
    setmax(event.target.value);
  }

  function handlego(e) {
    e.preventDefault();
    let url = '/search?';

    if (searchterm) {
      url += `q=${searchterm}`;
    }

    if (min) {
      url += `&min=${min}`;
    }

    if (max) {
      url += `&max=${max}`;
    }

    if(jobType){
      url += `&jobType=${jobType}`;
    }
  

    router.push(url);
  }

  return (
    <div>
      {/* <Header /> */}
      <div className="flex h-[800px] p-3">
        <div className="w-[300px] h-[800px] flex flex-col p-6 bg-blue-100 rounded-lg font-bold">
          <h1>Find jobs</h1>
          <form onSubmit={handlego}>
            <div>
              <input
                type="number"
                value={min}
                className="p-2 font-semibold border-3 rounded-lg border-green-600 m-2"
                onChange={handlemin}
                placeholder="Enter min Salary"
              />
              <input
                type="number"
                value={max}
                className="p-2 font-semibold border-3 rounded-lg border-green-600 m-2"
                onChange={handlemax}
                placeholder="Enter max Salary"
              />
            </div>
           

       
          <h1 className="flex justify-center pb-2 pt-5">Job type</h1>

<div className="flex gap-2 items-center">
  <input
    className="h-4 w-4"
    type="radio"
    name="jobType"
    value="on-site"
    checked={jobType === 'on-site'}
    onChange={(e) => setJobType(e.target.value)}
  />
  <div>On-Site</div>
</div>

<div className="flex gap-2 items-center">
  <input
    className="h-4 w-4"
    type="radio"
    name="jobType"
    value="remote"
    checked={jobType === 'remote'}
    onChange={(e) => setJobType(e.target.value)}
  />
  <div>Remote</div>
</div>

<div className="flex gap-2 items-center">
  <input
    className="h-4 w-4"
    type="radio"
    name="jobType"
    value="hybrid"
    checked={jobType === 'hybrid'}
    onChange={(e) => setJobType(e.target.value)}
  />
  <div>Hybrid</div>
</div>
 <button onClick={handlego}
              type="submit"
              className="p-2 mt-7 rounded-lg w-[200px] border font-bold bg-green-400"
            >
              Go
            </button>
          </form>

        </div>

        {children}
      </div>
    </div>
  );
}
