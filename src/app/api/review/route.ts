import { GetUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function  POST(req ) {
    const user = await GetUserFromCookies();
    const body = await req.json();

    const dataToSave = {
        ...body,
        user_id : user?.id
    }


   
    try {
         const reviews = await prismaclient.review.create({
           data : dataToSave
           
         })

         return NextResponse.json({
            success : true,
            data : reviews
         })
    }
    catch(err ){
        return NextResponse.json({
            success : false,
            message : " something wents wrong"
        })
    }

    
}