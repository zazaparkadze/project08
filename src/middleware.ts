import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "http://localhost:3000",
        "https://www.parkadze.com",
        "https://project08-bay.vercel.app",
        "https://www.google.com",
        "https://vercel.com",
        "https://project08-bay-git-feature-jwt-zaza-parkadze.vercel.app",
      ]
    : [
        "http://localhost:3000",
        "https://www.google.com",
        "https://project08-bay.vercel.app",
      ];

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
