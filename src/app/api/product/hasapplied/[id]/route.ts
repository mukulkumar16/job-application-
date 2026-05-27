import { GetUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest , {params} : any){
    const user = await GetUserFromCookies();

    const jobId = params.id;

    if(!user){
        return NextResponse.json({
            success : false ,
            data : {
                message : "user not authenticated "
            }
        })
    }

  

    try{
        const application = await prismaclient.applictaion.findFirst({
            where : {
                job_id : jobId,
                user_id : user.id

            },
        })
        return NextResponse.json({
            success: true,
            applied: !! application,
            data: application || null,
        })
    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            success : false,
            data : {
                message : "something wents wrong "
            }
        })
    }
 
}



