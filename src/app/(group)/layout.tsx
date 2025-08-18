//@ts-nocheck
'use client'
import { createContext, ReactNode, useEffect, useState } from "react";
import { Header } from "../component/Header";


export const userContext = createContext();


export default  function Layout({children} : {
    children : ReactNode
}){
    const [user,setuser] = useState(null);


    useEffect(()=>{
        async function getuser(){
            const res = await fetch("http://localhost:3000/api/current-user");
            console.log(res);
            
            const data = await res.json();
            console.log(data);
            if(data.success){

                setuser(data);
                console.log( "responce h ",data.user);
            }

        }
        getuser();
    },[])

    console.log(user);

    return (
        <div>
            <userContext.Provider value={{user, setuser}}>
                <Header/>
                {children}
            </userContext.Provider>

        </div>
    )
}