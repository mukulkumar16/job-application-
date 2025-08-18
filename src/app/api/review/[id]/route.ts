import prismaclient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET(req , {params}) {

    const {companyID}  =  params;
    try{

        const review = await prismaclient.review.findMany({
            where : {
                company_id : companyID
            }
        })

        if(!review){
              return NextResponse.json({
            success : false ,
            message : "something wrong"
        })
        }

        return NextResponse.json({
            success : true,
            data : review
        })

    }
    catch(err){
        return NextResponse.json({
            success : false ,
            message : "something wrong"
        })

    }
    
}