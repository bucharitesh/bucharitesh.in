import PageClient from "./page-client";
import { allPosts } from "content-collections";

export default async function Page() {
  const posts = await allPosts;
  
  return <PageClient posts={posts} />;
}