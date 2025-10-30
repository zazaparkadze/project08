import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // get refreshToken
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value as string;
  console.log("came a fetch request for new access token", refreshToken);

  const jwtDecoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  );

  // if refresh token is ok , issue new access token, and send response status
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
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    });

    response.cookies.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 1,
      path: "/",
    });

    return response;
  } else {
    const response = NextResponse.json(null, {
      status: 400,
      statusText: "Must Sign In",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    return response;
  }
}
