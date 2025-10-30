import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value as string;

  const jwtDecoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  );

  if ((jwtDecoded as JwtPayload).username) {
    const accessToken = jwt.sign(
      {
        username: (jwtDecoded as JwtPayload).username,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "5m" }
    );

    const response = NextResponse.json(null, {
      status: 200,
      statusText: "new access token created",
      headers: {
        "Access-Control-Allow-Origin": origin!,
        "Access-Control-Allow-Credentials": "true",
      },
    });

    response.cookies.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 300,
      path: "/",
    });

    return response;
  } else {
    const response = NextResponse.json(null, {
      status: 400,
      statusText: "Must Sign In",
      headers: {
        "Access-Control-Allow-Origin": origin!,
        "Access-Control-Allow-Credentials": "true",
      },
    });
    return response;
  }
}
