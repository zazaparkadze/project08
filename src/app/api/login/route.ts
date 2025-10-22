import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/model/User";
import bcrypt from "bcrypt";
import { limiter } from "@/config/limiter";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(request: Request) {
  connectDB();
  const origin = request.headers.get("origin");
  const remaining = await limiter.removeTokens(1);
  if (remaining < 0) {
    return NextResponse.json(
      {
        message: "maximum login rate exceeded",
      },
      {
        status: 429,
        statusText: "Too many Request",
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "text/plain;charset=UTF-8",
        },
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
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
        },
      }
    );
  }
  const foundUser: User | null = await User.findOne({ username: username });

  if (!foundUser) {
    return NextResponse.json(
      {
        username: "Sorry, Register First",
      },
      {
        status: 401,
        statusText: "unauthorized",
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
        },
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
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
        },
      }
    );
  }
  //jwt

  return NextResponse.json(foundUser, {
    status: 200,
    statusText: "loggedIn",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
