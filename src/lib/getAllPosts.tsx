"use server";
import Post from "../model/Post";
import connectToMongo from "./connectToMongo";

export default async function getAllPosts() {
  connectToMongo();
  const allPosts: Post[] = await Post.find();

  return JSON.stringify(allPosts);
}
