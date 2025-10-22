import { NextResponse } from "next/server";

export function GET() {
  const res = NextResponse.json(
    { message: "Hello" },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
  console.log(res);
  return res;
}
