"use server";
import Post from "../model/Post";
import connectDB from "./connectDB";

export default async function getAllPosts() {
  connectDB();
  const allPosts: Post[] = await Post.find();

  return JSON.stringify(allPosts);
}
