import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";

export async function GET(request: NextRequest) {
  connectDB();
  //get refreshtoken and accessToken
  const origin = request.headers.get("origin");
  const refreshToken = (await cookies()).get("refreshToken")?.value as string;
  const accessToken = (await cookies()).get("accessToken")?.value as string;
  console.log(refreshToken, accessToken);
  if (!accessToken && !refreshToken) {
    return NextResponse.json(null, {
      status: 200,
      statusText: "NO TOKENS _______nothing to delete",
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }
  try {
    //verify refreshToken
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    console.log(decoded, "from logout");
    //find user with this refershToken
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    console.log(foundUser);
    if (foundUser) {
      //delete refreshToken in MongoDB
      foundUser.refreshToken = "";
      await foundUser.save();
      const response = NextResponse.json(null, {
        status: 200,
        statusText: "refreshToken deleted in DB",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (accessToken) response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    } else {
      console.log("no found user from MongoDB");
      const response = NextResponse.json(null, {
        status: 200,
        statusText: "refreshToken deleted in DB",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (accessToken) response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  } catch {
    const response = NextResponse.json(null, {
      status: 200,
      statusText: "nothing to delete",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    if (accessToken) response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
  //delete accessToken and refreshtoken cookies on frontend
}
