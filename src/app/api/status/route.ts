import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(
      { status: "OK", message: "Next.js application is running and healthy." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Application status check failed:", error);
    return NextResponse.json(
      {
        status: "Error",
        message: "Status check encountered an internal issue.",
      },
      { status: 500 }
    );
  }
}
