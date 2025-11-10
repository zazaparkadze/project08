"use client";
import React from "react";
import { useData } from "@/app/DataContext";
import PostPage from "./PostPage";

type Props = {
  posts: Post[];
};

export default function PostPageList({ posts }: Props) {
  const { search } = useData();

  const filteredPosts = posts.filter(
    (post) =>
      post.postBody.toLowerCase().includes(search.toLowerCase()) ||
      post.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="max-w-[1000px]">
      {filteredPosts.reverse().map((post) => (
        <PostPage post={post} key={post.id} />
      ))}
    </div>
  );
}
