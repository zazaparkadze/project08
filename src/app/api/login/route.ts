import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/model/User";
import bcrypt from "bcrypt";
import { limiter } from "@/config/limiter";
import jwt from "jsonwebtoken";
import { allowedOrigins } from "@/config/allowedOrigins";

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  const headers = {
    "Access-Control-Allow-Origin": origin!,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (origin && allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 204,
      headers: headers,
    });
  }

  return new NextResponse(null, { status: 403 });
}

export async function POST(request: Request) {
  connectDB();
  const origin = request.headers.get("origin");
  const headers = {
    "Access-Control-Allow-Origin": origin!,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  const remaining = await limiter.removeTokens(1);
  if (remaining < 0) {
    return NextResponse.json(
      {
        message: "maximum login rate exceeded",
      },
      {
        status: 429,
        statusText: "Too many Request",
        headers: headers,
      }
    );
  }
  const { username, password } = await request.json();
  if (!username || !password) {
    return NextResponse.json(
      {
        message: "username and password required",
      },
      {
        status: 400,
        statusText: "Bad Request user/pwd",
        headers: headers,
      }
    );
  }
  const foundUser = await User.findOne({ username: username });
  if (!foundUser) {
    return NextResponse.json(
      {
        username: "Sorry, Register First",
      },
      {
        status: 401,
        statusText: "unauthorized",
        headers: headers,
      }
    );
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return NextResponse.json(
      {
        username: "Sorry, You Are Not Allowed",
      },
      {
        status: 403,
        statusText: "forbidden",
        headers: headers,
      }
    );
  }

  const accessToken = jwt.sign(
    { username: foundUser.username, roles: foundUser.roles },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "5m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username, roles: foundUser.roles },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "100m" }
  );

  foundUser.refreshToken = refreshToken;
  await foundUser.save();
  try {
    const response = NextResponse.json(
      {
        username: foundUser.username,
        id: foundUser.id,
        accessToken: accessToken,
      },
      {
        status: 200,
        statusText: "loggedIn",
        headers: headers,
      }
    );

    response.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 6000,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("LOGIN ERROR---:", error);
    return NextResponse.json(
      { error: "Internal Server Error from catch block", details: error },
      { status: 500 }
    );
  }
}
