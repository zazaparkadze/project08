import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { allowedOrigins } from "./config/allowedOrigins";

export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(
      JSON.stringify({ message: "Bad Request/Not Allowed" }),
      {
        status: 400,
        statusText: "Bad request legamre",
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": origin!,
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
