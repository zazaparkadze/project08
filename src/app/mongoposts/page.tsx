import getAllPosts from "@/lib/getAllPosts";
import PostPage from "./components/PostPage";
import HomeButton from "../../ui/HomeButton";

export default async function page() {
  const posts: Post[] = JSON.parse(await getAllPosts());
  return (
    <div className="text-4xl">
      <div className="sticky top-0 bg-black flex flex-col items-center pt-5">
        <p>Posts from mongo database directly!</p>
        <br />
        <HomeButton />
        <br />
      </div>
      {posts.map((post) => (
        <PostPage post={post} key={post.id} />
      ))}
    </div>
  );
}
