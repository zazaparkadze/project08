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
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;
    console.log("Decoded JWT:", decoded);
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

    console.log("Decoded refresh JWT:", decoded);

    const refreshEndpoint = "http://localhost:3000/api/refresh";
    const res = await fetch(refreshEndpoint, {
      method: "GET",
      headers: { cookie: `refreshToken=${refreshToken}` },
    });
    if (res.ok) {
      console.log("accessToken cookie set");
      const setCookieHeader = res.headers.get("set-cookie");
      const response = NextResponse.json({ message: "The same content-" });
      if (setCookieHeader) response.headers.set("Set-Cookie", setCookieHeader);
      return response;
    }

    if (!decoded) {
      return NextResponse.redirect(new URL("http://localhost:3000/login"));
    }

    return NextResponse.redirect(new URL("http://localhost:3000"));

    /* 
    return NextResponse.json(null, {
      status: 403,
      statusText: accessToken
        ? "Access token not valid or expired"
        : "no access Token present",
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": "true",
      },
    }); */
  }
}

// check refreshToken
/* 
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_ACCESS_TOKEN as string
      ) as JwtPayload;

      console.log("Decoded refresf JWT:", decoded);
      //if ok, new accessToken
      const refreshEndpoint = "http://localhost:3000/api/refresh";
      const res = await fetch(refreshEndpoint, {
        method: "GET",
        headers: { cookie: `refreshToken=${refreshToken}` },
      });
      if (res.ok) {
        console.log("accessToken cookie set");
        const setCookieHeader = res.headers.get("set-cookie");
        if (setCookieHeader) res.headers.set("set-cookie", setCookieHeader);
      }
    } catch (err) {
      console.error("JWT error:", err);
      //go to login page

      return NextResponse.redirect(new URL("/login", request.url));
    } */
