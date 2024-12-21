import PageClient from "./page-client";
import { allCrafts } from "content-collections";

export default async function Page() {
  const crafts = await allCrafts;
  
  return <PageClient crafts={crafts} />;
}