"use client";
/* export const dynamic = 'force-dynamic'; */
import { useState } from "react";
type Props = {
  post: Post;
};

export default function PostPage({ post }: Props) {
  const { title, postBody, dateTime, userId } = post;
  const [postLength, setPostLength] = useState(post.postBody?.length);

  function showHideContent() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    postLength > 25 ? setPostLength(0) : setPostLength(30);
  }
  const content = (
    <section className="flex flex-col justify-start px-10 pb-10">
      <p>Title: {title}</p>
      <p className="text-xl">Time: {dateTime}</p>
      <p onClick={showHideContent}>
        Content: {postLength ? postBody.slice(0, 25) + "..." : postBody}
      </p>
      <p>Posted By {userId ? userId : "anonimous"}</p>
    </section>
  );
  return content;
}
