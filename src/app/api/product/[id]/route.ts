

import { NextRequest, NextResponse } from "next/server";
import prismaclient from "@/services/prisma";
import { GetUserFromCookies } from "@/helper";

// export async function GET( { params }) {
  
//   try {
//       const id = params.id;
//         const job = await prismaclient.openings.findUnique({
//             where: {
//                 id: id
//             },
//             include: {
//                 company: true,
               
//             }
//         })

//         if (job) {
//             return NextResponse.json({
//                 success: true,
//                 data: job
//             })
//         }
//         else {
//             return NextResponse.json({
//                 success: false,
//                 message: "no job found"
//             })

//         }
//     }
//     catch (err) {

//         console.log(err.message);
//         return NextResponse.json({
//             success: false,
//             message: "something wents wrong "

//         })



//     }


// }



// export async function DELETE( { params }) {




//     try {

//         const jobId = params.id;
//         const res = await prismaclient.openings.delete({
//             where: {
//                 id: jobId
//             }
//         })


//         return NextResponse.json({
//             success: true,
//             data: res
//         })
//     }
//     catch (err) {
//         return NextResponse.json({
//             success: false,
//             message: "something wents wrong"

//         })

//     }



// }


export async function POST(req: NextRequest, { params }) {

    const body = await req.json();

    console.log(body);

    

    const id = await params.id;

    try {
        const job = await prismaclient.openings.update({
            where: {
                id: id
            },
            data : body
           
        })

        if (job) {
            return NextResponse.json({
                success: true,
                message : "updated successfully"
            })
        }
        else {
            return NextResponse.json({
                success: false,
                message: "no job found"
            })

        }
    }
    catch (err) {

        console.log(err.message);
        return NextResponse.json({
            success: false,
            message: "something wents wrong "

        })



    }


}



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

  const user = await GetUserFromCookies();
  const id = params.id;

  let userapplied = false;
  try {
    const job = await prismaclient.openings.findUnique({
      where: { id : id },
        include : {
            company : true
        }
    });
    if(user){
      const application = await prismaclient.applictaion.findMany({
      where : {
        job_id : id ,
        user_id : user?.id
      }
    })

    
    if(application.length > 0 ) userapplied = true;
    }

    const finalData = {
      ...job,
      userapplied
    }
    if (job) {
      return NextResponse.json(finalData);
    } else {
      return new NextResponse("Job not found", { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}