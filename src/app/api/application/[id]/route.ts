import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest , {params} : any){
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
        console.log(err);
        return NextResponse.json({
            success : false ,
            data : {
                message : "wrong"
            }
        })

    }
 }




export async function DELETE(req: NextRequest, { params }: any) {
  const application_id = params.id;

  try {
    const deleted = await prismaclient.applictaion.delete({
      where: {
        id: application_id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete",
      },
      { status: 500 }
    );
  }
}
