//@ts-nocheck
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createToken } from "@/services/jwt";

export async function POST(req: NextRequest) {
    const body = await req.json();
    // console.log(body.email);

    // const cookie = await cookies();
    const user = await prismaclient.user.findUnique({
        where: {
            email: body.email
        }
    })

    
    const userTokenData = {
        id : user.id
    }

    const token =  createToken(userTokenData);

    if (user?.password == body?.password) {
        const res = NextResponse.json({
            success: true,
            data : user
        });
     res.cookies.set('token ', token);
        return res;

    
       
    }
   
        return NextResponse.json({
        success: false,
        message : "responce nhi jaa rha h "
        
    })
    
    
}