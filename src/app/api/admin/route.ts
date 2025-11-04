import { NextRequest, NextResponse } from "next/server";
import User from "@/model/User";
import connectDB from "@/lib/connectDB";

export function OPTIONS(request: NextRequest) {
  connectDB();
  const origin = request.headers.get("origin");
  return NextResponse.json(null, {
    headers: {
      "Access-Control-Allow-Origin": origin!,
      "Access-Controll-Allow-Credentials": "true",
    },
  });
}

export async function POST(request: NextRequest) {
  connectDB();
  const origin = request.headers.get("origin");

  const { user } = await request.json();
  const userId = isNaN(Number(user)) ? user : Number(user);
  if (typeof userId === "string") {
    const result = await User.findOneAndDelete({ username: userId });
    //
    if (!result) {
      return NextResponse.json(null, {
        status: 404,
        statusText: "user not found",
        headers: {
          "Access-Control-Allow-Origin": origin!,
          "Access-Controll-Allow-Credentials": "true",
        },
      });
    }
    //
    if (result.username === userId) {
      return NextResponse.json(result, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": origin!,
          "Access-Controll-Allow-Credentials": "true",
        },
      });
    }
  } else {
    const result = await User.findOneAndDelete({ id: userId });
    if (!result) {
      return NextResponse.json(null, {
        status: 404,
        statusText: "user not found",
        headers: {
          "Access-Control-Allow-Origin": origin!,
          "Access-Controll-Allow-Credentials": "true",
        },
      });
    }
    //
    if (result.id === userId) {
      return NextResponse.json(result, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": origin!,
          "Access-Controll-Allow-Credentials": "true",
        },
      });
    }
  }
}
