import getAllPosts from "@/lib/getAllPosts";
import PostPage from "./components/PostPage";
import HomeButton from "../../ui/HomeButton";
import CreateMongoPost from "./components/CreateMongoPost";

export default async function page() {
  const posts: Post[] = JSON.parse(await getAllPosts());
  return (
    <div className="text-2xl flex flex-col items-center pt-4 gap-2">
      <div className="sticky top-0 bg-black flex flex-col gap-2 items-center pt-4">
        <p>Posts from mongo database directly!</p>
      </div>
      <HomeButton />
      <CreateMongoPost />
      <div className="max-w-[1000px]">
        {posts.reverse().map((post) => (
          <PostPage post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
