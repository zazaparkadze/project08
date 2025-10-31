import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  console.log(request.url);
  console.log(request.nextUrl);
  const origin = request.headers.get("origin");

  if (request.nextUrl.href.includes("zaza")) {
    return NextResponse.redirect(new URL("/", request.url), {
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": origin!,
      },
    });
  }
  const response = NextResponse.json(
    { message: "secret page" },
    {
      status: 200,
      statusText: "cookie will be set",
      headers: {
        "Set-Cookie": "editor=1984; max-age=60",
        "set-cookie": "admin=5150; max-age=90",
      },
    }
  );
  return response;
}
