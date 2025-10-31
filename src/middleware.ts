import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const allowedOrigind =
  process.env.NODE_ENV === "production"
    ? [
        "*vercel.app",
        "http://localhost:3000",
        "https://www.parkadze.com",
        "https://www.google.com",
        "https://project08-bay.vercel.app",
        "https://nextapi-psi.vercel.app",
      ]
    : [
        "*vercel.app",
        "http://localhost:3000",
        "https://www.google.com",
        "https://www.parkadze.com",
        "https://www.google.com",
        "https://vercel.com",
        "https://project08-bay.vercel.app",
        "https://nextapi-psi.vercel.app",
        "https://project08-bay-git-feature-jwt-zaza-parkadze.vercel.app",
      ];

export async function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const { pathname } = request.nextUrl;

  if (origin && !allowedOrigind.includes(origin)) {
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
  if (pathname === "/michael") {
    return NextResponse.redirect(new URL("https://parkadze.com"), {
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": origin!,
      },
    });
  }
  return NextResponse.next();
}

const regex = new RegExp("/api/(?!login|register|refresh).*");

export const config = {
  matcher: [regex, "/michael"],
};
