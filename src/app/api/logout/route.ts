import { NextResponse } from "next/server";

export async function GET() {
  // Create a response
  const res = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Delete the cookie by setting it to empty and expired
  res.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // Immediately expire
    path: "/", // clear for all routes
  });

  return res;
}
