import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function remarkPostItem(_id: string) {
  const directoryName = path.join(
    process.cwd(),
    "src",
    "app",
    "blog",
    "blogposts"
  );
  const fullPath = path.join(directoryName, `${_id}.md`);

  const postData = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(postData);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  const blogPostWithHtml: BlogPost & { contentHtml: string } = {
    _id,
    date: matterResult.data.date,
    title: matterResult.data.title,
    contentHtml: contentHtml,
  };
  return blogPostWithHtml;
}
