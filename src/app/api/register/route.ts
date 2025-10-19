"use server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/model/User";
import bcrypt from "bcrypt";

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
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({
      status: 400,
      statusText: "Bad Request, username and/or password missing",
    });
  }
  // check username
  connectDB();
  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) {
    return NextResponse.json(
      { message: "choose another username" },
      {
        status: 400,
        statusText: "bad request, duplicate username",
      }
    );
  }
  // create hashed password, create new user
  const allUsers = await User.find().lean().exec();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: allUsers.length ? allUsers[allUsers.length - 1].id + 1 : 1,
    username,
    password: hashedPassword,
    refreshToken: "",
  };
  //write to database
  const result = await User.create(newUser);
  // send response if registration failed

  if (!result) {
    return NextResponse.json({
      message: "registration failed",
      status: 500,
      statusText: "server error, registration failed",
    });
  }

  console.log(result);

  return NextResponse.json(result);
}
