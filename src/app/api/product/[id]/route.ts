import { NextRequest, NextResponse } from "next/server";
import prismaclient from "@/services/prisma";
import { GetUserFromCookies } from "@/helper";



export async function POST(req: NextRequest, { params }: any) {
  const body = await req.json();
  const id = params.id;

  try {
    const job = await prismaclient.openings.update({
      where: { id },
      data: body,
    });

    if (job) {
      return NextResponse.json({
        success: true,
        message: "Updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No job found",
      });
    }
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}


export async function GET(req: NextRequest, { params }: any) {
  const user = await GetUserFromCookies();
  const id = params.id;

  let userapplied = false;

  try {
    const job = await prismaclient.openings.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });

    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }

    if (user) {
      const application = await prismaclient.applictaion.findMany({
        where: {
          job_id: id,
          user_id: user.id,
        },
      });

      userapplied = application.length > 0;
    }

    return NextResponse.json({
      ...job,
      userapplied,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
