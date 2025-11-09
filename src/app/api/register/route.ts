"use server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/model/User";
import bcrypt from "bcrypt";

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin!,
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH",
    },
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const headers = {
    "Access-Control-Allow-Origin": origin!,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH",
  };
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({
      status: 400,
      statusText: "Bad Request, username and/or password missing",
      headers: headers,
    });
  }

  connectDB();
  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) {
    return NextResponse.json(
      { message: "choose another username" },
      {
        status: 400,
        statusText: "bad request, duplicate username",
        headers: headers,
      }
    );
  }
  const allUsers = await User.find().lean().exec();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: allUsers.length ? allUsers[allUsers.length - 1].id + 1 : 1,
    username: username,
    password: hashedPassword,
    refreshToken: "",
  };
  const result = await User.create(newUser);
  if (!result) {
    return NextResponse.json({
      message: "registration failed",
      status: 500,
      statusText: "server error, registration failed",
      headers: headers,
    });
  }
  return NextResponse.json(result);
}
