import Post from "@/model/Post";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";

export async function GET() {
  connectDB();
  const Posts = await Post.find();
  if (!Posts.length) {
    return NextResponse.json(
      { message: "Posts array is empty" },
      {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
  return NextResponse.json(Posts, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
