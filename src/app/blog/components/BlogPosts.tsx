import getSortedPostsData from "@/lib/getSortedPostsData";
import Posts from "./Posts";

export default function BlogPosts() {
  const sortedPostsData = getSortedPostsData();

  const content = sortedPostsData.map((post) => {
    return <Posts post={post} key={post._id} />;
  });
  return (
    <div>
      <br />
      <h1 className="text-6xl pl-20 ">Blog</h1>
      {content}
    </div>
  );
}
