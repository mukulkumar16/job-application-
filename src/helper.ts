//@ts-nocheck
import { cookies } from "next/headers";
import prismaclient from "./services/prisma";
import { NextResponse } from "next/server";
import { verifyToken } from "./services/jwt";

export async function GetUserFromCookies(){

    const userCookies = await cookies();
    const token = userCookies.get('token')?.value;
    // console.log(token);
    // const email = userCookies.get('token')?.value;
    if(!token){
        return null;
    }
     
    const data = verifyToken(token);
    if(!data){
        return null
    }

    console.log("data == " , data);
    const user = await prismaclient.user.findUnique({
        where : {
            id : data.id
        },
        include : {
            company :{
                include : {
                    owner : true
                }
            }
        },
        omit : {
            password : true
        }
    })

    if(!user ){
       return null;
    }
     
    return user;


}