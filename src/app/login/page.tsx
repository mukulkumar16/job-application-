//@ts-nocheck
'use client'
import { useState } from "react"
import { handleSubmit } from "../action";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LoginUser, SignUp } from "../action/prodaction";
import { useRouter } from "next/navigation";


export default function FormValidation() {

    const router = useRouter();
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState({});
    const [msg , setmsg ] = useState("");

    async function validateSubmit(event) {
        event.preventDefault();
        const errorObj = {};

        
        if (!email.includes("@")) {
            errorObj.email = "Email invalid";
        }

        if (password.length < 6){
            errorObj.password = "Password length should be minimum of 6";
        }

        setError(errorObj);

        if( errorObj.email || errorObj.password){
            setError(errorObj);
            return;
        }else{
            const data = {
                email : email ,
                password : password,
                
   
  
   
            }
            const res = await fetch("http://localhost:3000/api/login",{
            method : "POST",
             body : JSON.stringify(data)
            });
            const dat = await res.json();


            if(dat?.success){
       
               setmsg(res.message);
              alert("login");
              router.push('/');

            }else {
                alert("oppsss")
                
                setmsg(res.message);
                
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <form
                onSubmit={validateSubmit}
                className=" shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-black">Sign-in</h2>

                

                <div>
                    <label className="block mb-1 text-sm font-semibold text-black">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        className="w-full px-4 py-2 border rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {error.email && (
                        <p className="text-green-500 text-sm mt-1">{error.email}</p>
                    )}
                </div>
                <div>
                    <label className="block mb-1 text-sm font-semibold text-black">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="enter password"
                        className="w-full px-4 py-2 text-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {error.password && (
                        <p className="text-green-500 text-sm mt-1">{error.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
                >
                    Submit
                </button>
                 {
                msg && <p className="flex justify-center items-center text-black font-bold">{msg}</p>
            }
            <Link href={'/signup'}><div className="text-sm"
                >
                    You Don't have any Account

            </div></Link>
            </form>
            
           
           
        </div>
    );
}







