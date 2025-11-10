"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
type Props = {
  post: Post;
};

export default function PostPage({ post }: Props) {
  const { title, postBody, dateTime, userId } = post;
  const [postLength, setPostLength] = useState(post.postBody?.length);

  function showHideContent() {
    postLength > 125 ? setPostLength(0) : setPostLength(130);
  }
  const content = (
    <section className="flex flex-col px-10 pb-3">
      <p>Title: {title}</p>
      <p className="text-xl">Time: {dateTime}</p>
      <p onClick={showHideContent}>
        Content: {postLength ? postBody.slice(0, 125) + "..." : postBody}
      </p>
      <p>Posted By {userId ? userId : "anonimous"}</p>
      <hr />
    </section>
  );
  return content;
}
