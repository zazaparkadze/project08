import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { allowedRolesSecret } from "./config/allowedRolesSecret";
export const runtime = "nodejs";

interface MyJwtPayload extends JwtPayload {
  roles: {
    root?: number;
    admin?: number;
    editor?: number;
    user: number;
  };
}

export async function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  // user's roles from jwt
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get("refreshToken")?.value as string;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    const userRoles = (decoded as MyJwtPayload).roles;

    const allowedToSecrets = Object.values(userRoles)
      .map((value) => Object.values(allowedRolesSecret).indexOf(value) !== -1)
      .find((e) => e === true);

    if (!allowedToSecrets) {
      return NextResponse.json(
        { message: "not allowed from middleware, Reason: roles" },
        {
          status: 403,
          statusText: "FORBIDDEN FROM MIDDLEWARE, Reason: roles",
          headers: {
            "Access-Control-Allow-Origin": origin!,
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "not allowed from middleware", error: error },
      {
        status: 403,
        statusText: "FORBIDDEN FROM MIDDLEWARE",
        headers: {
          "Access-Control-Allow-Origin": origin!,
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/secret", "/admin"],
};
