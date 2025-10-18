import Link from "next/link";

type Props = {
  post: BlogPost;
};

export default function Posts({ post }: Props) {
  const content = (
    <div className="px-5 ">
      <br />
      <p className="text-3xl underline pb-3">
        <Link href={`blog/post/${post._id}`}> Title: {post.title}</Link>
      </p>
      <p className="text-xl">Date: {post.date}</p>
      <br />
    </div>
  );
  return content;
}
