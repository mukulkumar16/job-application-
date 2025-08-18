//@ts-nocheck
// 'use client'

// import { useEffect, useState } from "react";
// import Addjob from "../(group)/Addjob";



// export function Header() {
//   const [q, setQ] = useState("");
//   const [ sugg , setsugg ] = useState([]);

//   useEffect(()=>{
//     async function getSugg(){
//       const sug = await fetch("http://localhost:3000/api/search/suggestion?q=" + q);
//       const data = await sug.json();
//       setsugg(data);
//     }

//     if(!q){
//       getSugg();
//     }



//   },[q]);
//   console.log(sugg);

//   return (

//     <header>
//       <div className="h-[100px] p-9 w-[100vw] bg-emerald-700 flex realtive justify-between">
//         <div className="font-bold text-amber-50">
//           Jobs Dekhoo
//         </div>
//         <form action={'/search'} method="GET" className="flex gap-2">
//           <input
//             value={q}
//             onChange={(e) => setQ(e.target.value)}
//             placeholder="Search jobs"
//             name="q"
//             className="border px-3 py-2 rounded w-full"
//           />
//           {
//             sugg && <div className="absolute">
//               {
//                 sugg?.map((elem)=>{
//                   return <p className="">{elem?.title}</p>


//                 })
//               }
//             </div>
//           }
//           <button type="submit" className="px-4 bg-green-600 text-white rounded">Search</button>
//         </form>
//         <Addjob/>

//       </div>
//     </header>

//   )
// }


'use client'

import { useContext, useEffect, useState } from "react";
import Addjob from "../(group)/Addjob";
import { userContext } from "../(group)/layout";
import Link from "next/link";
import UserDropDown from "./UserDropDwon";
// import { GetUserFromCookies } from "@/helper";

export function Header() {
  const [q, setQ] = useState("");
  const [sugg, setsugg] = useState([]);
  const { user } = useContext(userContext);


  console.log("user nhi h " , user);

  // const token = await GetUserFromCookies();

  useEffect(() => {
    async function getSugg() {
      const sug = await fetch("http://localhost:3000/api/search/suggestion?q=" + q);
      const data = await sug.json();
      setsugg(data);
    }

    if (q) {

      getSugg();
    }
    else setsugg([]);
  }, [q]);

  return (
    <header className="w-full bg-emerald-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">

        {/* Logo / Title */}
        <div className="text-2xl font-extrabold text-white tracking-wide">
          Jobs <span className="text-yellow-300">Dekhoo</span>
        </div>

        {/* Search Form */}
        <form action="/search" method="GET" className="flex-1 mx-4 relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for jobs..."
            name="q"
            className="w-full px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          {/* Suggestions */}
          {sugg.length > 0 && (
            <div className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {sugg.map((elem, idx) => (
                <p
                  key={idx}
                  className="px-4 py-2 hover:bg-emerald-100 cursor-pointer text-sm text-gray-700"
                  onClick={() => setQ(elem.title)}
                >
                  {elem?.title}
                </p>
              ))}
            </div>
          )}
        </form>

        {/* Search Button */}
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-100 transition"
        >
          Search
        </button>

        {/* Add Job Button */}
        <div className="ml-4">
          {/* {<Addjob />} */}

        </div>
       <div className="flex justify-between">
         { user ? (<div><Link href={''}> <button className="px-4 py-2 p-3 ml-2 bg-green-600 text-white rounded hover:bg-green-700">
            LogOut
          </button></Link> </div> ) : (<div className="ml-4">
          {/* <Link href={'/login'}> <button className="px-4 py-2 p-3 bg-green-600 text-white rounded hover:bg-green-700">
            Login
          </button></Link> */}
        </div>)  }
        <Link href={'/applied-job'}> <button className="px-4 py-2  ml-4 p-3 bg-green-600 text-white rounded hover:bg-green-700">
            Applied job 
          </button></Link>
          <UserDropDown user={user}/>
       </div>
      </div>
    </header>
  );
}
