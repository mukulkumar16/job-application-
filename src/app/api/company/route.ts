
import { GetUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";


import { NextRequest, NextResponse } from "next/server";


export async function POST(req : NextRequest) {


    const user = await GetUserFromCookies();


    if(!user ){
        return NextResponse.json({
            succes : false,
            message  : "failed"
        })
    }

    const body = await req.json();
    const company = {
     
        name : body.name,
        description : body.description,
        owner_id : user.id
       
    }

  try { const newComp = await prismaclient.company.create({
        data : company 
    })

    return NextResponse.json({
        success : true,
        data : newComp
    })
}
catch(err : any){
    console.log(err.message);
    return NextResponse.json({
        success : false
    })
}
    
}