import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  console.log(origin);
  const pathname = request.nextUrl.pathname;

  if (pathname === "/michael") {
    return NextResponse.redirect(new URL("https://parkadze.com"));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/michael"],
};
