import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    }
  );
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin") as string;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value as string;
  const refreshToken = cookieStore.get("refreshToken")?.value as string;

  if (!accessToken && !refreshToken) {
    const { pathname, origin } = request.nextUrl;

    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", origin));
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    return NextResponse.json(
      {
        message: `the same content --- Hello ${decoded.username}, you have an access to this page!`,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  } catch (err) {
    console.error("JWT error:", err);

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as JwtPayload;

    const refreshEndpoint =
      process.env.NODE_ENV === "production"
        ? "https://project08-bay.vercel.app/api/refresh"
        : "http://localhost:3000/api/refresh";

    const loginEndpoint =
      process.env.NODE_ENV === "production"
        ? "https://project08-bay.vercel.app/login"
        : "http://localhost:3000/login";

    const rootUrl =
      process.env.NODE_ENV === "production"
        ? "https://project08-bay.vercel.app"
        : "http://localhost:3000";

    const res = await fetch(refreshEndpoint, {
      method: "GET",
      headers: { cookie: `refreshToken=${refreshToken}` },
    });
    if (res.ok) {
      const setCookieHeader = res.headers.get("set-cookie");
      const response = NextResponse.json({ message: "The same content-" });
      if (setCookieHeader) response.headers.set("Set-Cookie", setCookieHeader);
      return response;
    }

    if (!decoded) {
      return NextResponse.redirect(new URL(loginEndpoint));
    }

    return NextResponse.redirect(rootUrl);
  }
}
