import { createToken } from "@/services/jwt";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();
    const userToCreate = {
        email: body.email,
        password: body.password
    }

    console.log(userToCreate);

    try {

        const user = await prismaclient.user.create({
            data : userToCreate
        })

        const usertoken = {
            id : user.id
        }

        const token =  createToken(usertoken);

        const res = NextResponse.json({
            success: true,
            data : user

        });

        res.cookies.set('token' , token);
        return res;

    }catch(err){
        return NextResponse.json({
            success : false
        },{status : 500})

    }
  
    
}