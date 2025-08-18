//@ts-nocheck
'use client'
import { useContext } from "react"
import { userContext } from "../(group)/layout"

export default function EditDelete({ job  }) {

    // console.log("apna user " , user);

    const {user} = useContext(userContext);
    console.log("user context" , user);

   async function handleclick(){
        try{
            const res = await fetch("/api/product/" + job.id ,{
                method : "DELETE"
            });
            const data = await res.json();
            if(data.success){
                alert("deleted successfully");
            }
            else{
                alert("something wents wrong");
            }
        }catch(err){
            alert("DB problem");
        }
    }


    if (user?.company?.id == job?.company?.id) 
    {

        return (
            <div>
                <button onClick={handleclick} className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition">
                    edit 
                </button>
                <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition">
                    delete
                </button>
            </div>
        )

    }
    else return null
}
