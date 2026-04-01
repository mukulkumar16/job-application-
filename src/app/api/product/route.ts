// @ts-nocheck
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ❗ safety check
    if (!body.company_id) {
      return NextResponse.json(
        { success: false, message: "Company ID is required" },
        { status: 400 }
      );
    }

    const product = await prismaclient.openings.create({
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        salary: body.salary,
        employment_type: body.employment_type,
        job_type: body.job_type,

        // ✅ FIXED RELATION
        company: {
          connect: {
            id: body.company_id,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "DB error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}