//@ts-nocheck
import { GetUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req ){
    const body = await req.json();
    // const user = await GetUserFromCookies();
    // console.log(body.title);
    // const prodToStore = {
    //      title: body.title,
    //         description: body.description,
    //         location: body.location,
    //         salary: body.salary,
    //         employment_type: body.employment_type,
    //         job_type: body.job_type
      
    // }

    // const dataTosave = {
    //     ...body,
    //     company_id : user?.company?.id
    // }

    // console.log(prodToStore);
    const product = await prismaclient.openings.create({
        data : body
    })

    if(!product){
        return {
            success : false,
            message : "not added"
        }
    }

    return NextResponse.json({
        success : true,
        data : product
        
    })

}