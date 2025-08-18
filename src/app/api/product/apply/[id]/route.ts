import { GetUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest , {params}){
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

    const appToSave = {
        user_id : user?.id,
        job_id : jobId

    }

    try{
        const appliaction = await prismaclient.applictaion.create({
            data : appToSave
        })
        return NextResponse.json({
            success : true,
            data : appliaction
        })
    }
    catch(err){
        console.log(err.message);
        return NextResponse.json({
            success : false,
            data : {
                message : "something wents wrong "
            }
        })
    }
 
}



export async function DELETE(req, {params}){
    const {id} = await params;

    const user = await GetUserFromCookies();
    if(user)
    try {
        const appliaction = await prismaclient.applictaion.deleteMany({
            where : {
                user_id : user?.id,
                job_id : id
            }
        })
        if(appliaction){
            return NextResponse.json({
                success : true,
                message : "Deleted successfully"
            })
        }

        return NextResponse.json({
            success : false ,
            message : "failed"
        })
    } catch (error) {

        console.log(error.message);
         return NextResponse.json({
            success : false ,
            message : "failed"
        })
        
    }
}