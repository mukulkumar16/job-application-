//@ts-nocheck
'use client'
import { Card } from "@radix-ui/themes";
import { Badge } from "lucide-react";
import { Dialog } from "radix-ui";
import { useEffect, useState } from "react";

export default function ViewJobApplicant({job}){


    async function handleDelete(id : string){
        try {
            const res = await fetch("/api/application")
        } catch (error) {
            
        }

    }


    const [applicants , setapplicants ] = useState([]);


    useEffect(()=>{
       async function GetApplicants(){
        const res = await fetch("/api/application/" + job.id);
        const data = await res.json();

        console.log("aappp data==>",data );
        if(data.success){
            setapplicants(data?.data);
        }

        }
        GetApplicants();

    },[])

    console.log("appp===>>" , applicants);
   
      
    
        
    
    
        
    
        return (
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="px-2 py-2 p-3 h-[50px] bg-green-600 text-white rounded hover:bg-green-700">
                        View Applicants
                    </button>
                </Dialog.Trigger>
    
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    
                    <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full bg-white p-6 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
                        <Dialog.Title className="text-lg font-bold mb-2">All Applicants </Dialog.Title>
                        <Dialog.Description className="text-sm text-gray-600 mb-4">
                            Job Applicants
                             {
                                    applicants.map((app)=>{
                                        return (
                                          
                                          <div key={app.id}>
                                             <h1> email : {app.user.email}</h1>
                                             <button onClick={()=>{handleDelete}}>Delete</button>
                                          </div>
                                        )
                                    })
                                }
                        </Dialog.Description>
    
                                
    
                        <div className="flex justify-end gap-3 mt-6">
                            <Dialog.Close asChild>
                                
                            </Dialog.Close>
                            <Dialog.Close asChild>
                               
                               
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );
    }
