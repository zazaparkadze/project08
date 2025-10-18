import getSortedPostsData from "@/lib/getSortedPostsData";
import { notFound } from "next/navigation";
import ProfilePic from "../../components/ProfilePic";
import remarkPostItem from "@/lib/remarkPostItem";

type Params = {
  params: Promise<{ postId: string }>;
};

export async function generateStaticParams() {
  const allPosts = await getSortedPostsData();
  return allPosts.map((post) => ({ postId: post._id }));
}

export default async function IndevidualPost({ params }: Params) {
  const { postId } = await params;
  const allPosts = await getSortedPostsData();
  const postItem = allPosts.find((post) => post._id === postId);
  if (!postItem) notFound();

  const { contentHtml, title, date } = await remarkPostItem(postId);
  ////////// remarkPostContent - remark-html, remark-parse, to-vfile, unified

  return (
    <div>
      <div className="p-3 m-3 flex justify-center items-center gap-5 md:flex-col">
        <ProfilePic />
        <p className="text-3xl mt-10 mb-10 text-center">
          Hello and Welcome, 👋 &nbsp;
          <span className="whitespace-nowrap">I am Zaza</span>
        </p>
      </div>
      <div className="text-4xl p-3 m-3">
        <p className="text-xl">{date}</p>
        <br />
        <p>{title}</p>
        <br />
        <section dangerouslySetInnerHTML={{ __html: contentHtml }}></section>
      </div>
    </div>
  );
}
