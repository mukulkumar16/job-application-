

import { GetUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

type searchQuery = Promise<{
    id : string
}>

export async function GET(req  : NextRequest, {params } : {
    params : searchQuery
} ) {

    const q  = await params
    const id = q.id;
    const company = await prismaclient.company.findUnique({
        where : {
            id : id
        },
        include : {
            owner : true,
            job : true
        }
    })


    // const owner = await prismaclient.user.findUnique({
    //     where : {
    //         id : company?.owner_id
    //     }
    // })
    
    // const data = {
    //     company,
    //     owner
    // }

    return NextResponse.json({
        success : true,
        data : company
    })

}



export async function DELETE(req : NextRequest, {params } : {
    params  : searchQuery
}) {
    const q = await params;
    const id = q.id;
    const user = await GetUserFromCookies();
    // const comapny = await prismaclient.company.findUnique({
    //     where : {
    //         id
    //     }
    // })
    
    // if(comapny?.owner_id == user?.id ){
    //     const res = await prismaclient.company.delete({
    //         where : {
    //             id
    //         }
    //     })

    if(user?.company?.id == id){
         const res = await prismaclient.company.delete({
            where : {
                id
            }
        })

         return NextResponse.json({
            success :  true,
            message : "deleted "
        })
    
    }


       

    return NextResponse.json({
        success : false , 
        message  : "not delete"
    })
}



// router.push("/")  soft redirect 
// window.location.href='/'  full page reload