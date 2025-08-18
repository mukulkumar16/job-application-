import prismaclient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET(req , {params}){
    const job_id = params.id;
    try{

        const res = await prismaclient.applictaion.findMany({
            where : {
                job_id : job_id
            },
            include : {
                user : true
            }
        })

        return NextResponse.json({
            success : true,
            data : res
        })

    }
    catch(err){
        console.log(err.message);
        return NextResponse.json({
            success : false ,
            data : {
                message : "wrong"
            }
        })

    }
 }




 export async function DELETE(){
    try {

        
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            success : false,
            message : "failed"
        })
        
    }
 }