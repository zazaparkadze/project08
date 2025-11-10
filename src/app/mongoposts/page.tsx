export const dynamic = "force-dynamic";
import getAllPosts from "@/lib/getAllPosts";
import HomeButton from "../../ui/HomeButton";
import CreateMongoPost from "./components/CreateMongoPost";
import SearchForm from "./components/SearchForm";
import PostPageList from "./components/PostPageList";

export default async function page() {
  const posts: Post[] = JSON.parse(await getAllPosts());

  return (
    <div className="text-2xl flex flex-col items-center gap-2 min-h-screen">
      <div className="sticky top-0 bg-transparent flex flex-col items-center py-2">
        Posts from mongo database directly!
      </div>
      <HomeButton />
      <CreateMongoPost />
      <SearchForm />
      <PostPageList posts={posts} />
    </div>
  );
}
