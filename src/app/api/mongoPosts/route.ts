import Post from "@/model/Post";
import { NextResponse } from "next/server";
import connectToMongo from "../../../lib/connectToMongo";

export async function GET() {
  connectToMongo();
  const Posts = await Post.find();
  if (!Posts.length) {
    return NextResponse.json({ message: "Posts array is empty" });
  }
  return NextResponse.json(Posts);
}
