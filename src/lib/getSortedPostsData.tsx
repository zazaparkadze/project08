import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function getSortedPostsData() {
  const directoryName = path.join(
    process.cwd(),
    "src",
    "app",
    "blog",
    "blogposts"
  );
  const fileNames = fs.readdirSync(directoryName);
  const blogPostsData = fileNames.map((fileName) => {
    const _id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(directoryName, fileName);

    const postData = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(postData);
    const blogPost = {
      _id,
      date: matterResult.data.date,
      title: matterResult.data.title,
      /*       body: matterResult.content, */
    };
    return blogPost;
  });
  return blogPostsData.sort((a, b) => (a.date > b.date ? 1 : -1));
}
