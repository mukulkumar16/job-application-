
'use client'
import { FormEvent, useState } from "react";

export default function Page(){
    const [name , setname] = useState("");
    const [desc , setdesc] = useState("");

   async function handlecreate(e : FormEvent<HTMLFormElement>){
        e.preventDefault();
        const company = {
            name,
            description : desc,
            // owner_id : ownerid
        }

        const res = await fetch("http://localhost:3000/api/company" , {
            method : "POST",
            body : JSON.stringify(company)
            
        })
        const data  = await res.json();
        if(data.success){
            alert("added")

        }
        else{
            alert("not")
        }

    }

    return (
             <div className="min-h-screen flex items-center justify-center  px-4">
            <form
                onSubmit={handlecreate}
                className=" shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-black">Create Company</h2>

                

                <div>
                    <label className="block mb-1 text-sm font-semibold text-black">
                        Name
                    </label>
                    <input
                       
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        placeholder="Enter Company Name "
                        className="w-full px-4 py-2 border rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                   
                </div>
                <div>
                    <label className="block mb-1 text-sm font-semibold text-black">
                        Description
                    </label>
                    <input
                       type="text"
                        value={desc}
                        onChange={(e) => setdesc(e.target.value)}
                        placeholder="Enter Company Details"
                        className="w-full px-4 py-2 text-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    
                   
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
                >
                    Create
                </button>
                
            </form>
            
           
           
        </div>
    )
}