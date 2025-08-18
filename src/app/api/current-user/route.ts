//@ts-nocheck
import { GetUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(){

    // const userCookies = await cookies();
    // const email = userCookies.get('token')?.value;
    // console.log( "user email",email);

    const user = await GetUserFromCookies();
    console.log(user)
    
    if(!user){
        return NextResponse.json({
            success : false,
            message : "user not found"
        })
    }
    //


    // const userID = user.id;
    // console.log(userID);

    // const comapny = await prismaclient.company.findUnique({
    //     where : {
    //         owner_id : userID
    //     }
    // })

    // console.log(comapny);

    // const d = {
    //     ...user,
    //    comapny

    // }
    // console.log(user)
    return NextResponse.json({
        success : true ,
        data : user
    })
}