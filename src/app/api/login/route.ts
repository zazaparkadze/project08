import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/model/User";
import bcrypt from "bcrypt";
import { limiter } from "@/config/limiter";
import jwt from "jsonwebtoken";

const allowedOrigins = [
  "http://localhost:3000",
  "https://www.google.com",
  "https://www.parkadze.com",
  "https://www.google.com",
  "https://vercel.com",
  "https://project08-bay.vercel.app",
  "https://nextapi-psi.vercel.app",
  "https://project08-bay-git-feature-jwt-zaza-parkadze.vercel.app", // optional fallback
  "*vercel.app",
];

function getCorsHeaders(origin: string | null) {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (origin && allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  } else {
    headers["Access-Control-Allow-Origin"] = allowedOrigins[0]; // default localhost
  }

  return headers;
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  const headers = getCorsHeaders(origin);
  return new Response(null, { status: 204, headers });
}

export async function POST(request: Request) {
  await connectDB();

  const origin = request.headers.get("origin");
  const headers = getCorsHeaders(origin);

  const remaining = await limiter.removeTokens(1);
  if (remaining < 0) {
    return NextResponse.json(
      { message: "maximum login rate exceeded" },
      { status: 429, headers }
    );
  }

  const { username, password } = await request.json();
  if (!username || !password) {
    return NextResponse.json(
      { message: "username and password required" },
      { status: 400, headers }
    );
  }

  const foundUser = await User.findOne({ username });
  if (!foundUser) {
    return NextResponse.json(
      { message: "Sorry, Register First" },
      { status: 401, headers }
    );
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return NextResponse.json(
      { message: "Sorry, You Are Not Allowed" },
      { status: 403, headers }
    );
  }

  const accessToken = jwt.sign(
    { username: foundUser.username },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "180m" }
  );

  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  const response = NextResponse.json(
    {
      username: foundUser.username,
      id: foundUser.id,
      accessToken,
    },
    { status: 200, headers }
  );

  response.cookies.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 86400,
    path: "/",
  });

  return response;
}

/* import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/model/User";
import bcrypt from "bcrypt";
import { limiter } from "@/config/limiter";
import jwt from "jsonwebtoken";

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  const loginResponseHeaders = {
    "Access-Control-Allow-Origin": origin! || "http://localhost:3000",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  return new Response(null, {
    status: 204,
    headers: loginResponseHeaders,
  });
}

export async function POST(request: Request) {
  connectDB();
  const origin = request.headers.get("origin");
  const loginResponseHeaders = {
    "Access-Control-Allow-Origin": origin!,
    "Access-Control-Allow-Credentials": "true",
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
        headers: loginResponseHeaders,
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
        statusText: "Bad Request",
        headers: loginResponseHeaders,
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
        headers: loginResponseHeaders,
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
        headers: loginResponseHeaders,
      }
    );
  }

  const accessToken = jwt.sign(
    { username: foundUser.username },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "180m" }
  );

  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  const response = NextResponse.json(
    {
      username: foundUser.username,
      id: foundUser.id,
      accessToken: accessToken,
    },
    {
      status: 200,
      statusText: "loggedIn",
      headers: loginResponseHeaders,
    }
  );

  response.cookies.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 86400,
    path: "/",
  });

  return response;
}
 */
