import getAllPosts from "@/lib/getAllPosts";
import PostPage from "./components/PostPage";
import HomeButton from "../../ui/HomeButton";
import CreateMongoPost from "./components/CreateMongoPost";

export default async function page() {
  const posts: Post[] = JSON.parse(await getAllPosts());

  return (
    <div className="text-2xl flex flex-col items-center gap-2">
      <div className="sticky top-0 bg-transparent flex flex-col items-center py-2">
        Posts from mongo database directly!
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
