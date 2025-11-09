"use server";
import Post from "@/model/Post";
import { format } from "date-fns";
import connectDB from "@/lib/connectDB";

export async function createMongoPost(formData: FormData) {
  connectDB();
  const postTitle = formData.get("title");
  const postBody = formData.get("newpost");

  const allPosts = await Post.find({});

  const newPost = {
    id: allPosts[allPosts.length - 1].id + 1 || 1,
    dateTime: format(new Date(), "dd-MM-yyyy\tHH:mm:ss"),
    title: postTitle,
    postBody: postBody,
    comments: [],
    likes: 1,
    dislikes: 0,
    userId: 1,
  };

  await Post.create(newPost);
}
