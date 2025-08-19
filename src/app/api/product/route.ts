//@ts-nocheck
import { GetUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const body = await req.json();
    
    const product = await prismaclient.openings.create({
        data : body
    })

    if (!product) {
  return NextResponse.json(
    {
      success: false,
      message: "Not added",
    },
    { status: 500 }
  );
}


    return NextResponse.json({
        success : true,
        data : product
        
    })

}