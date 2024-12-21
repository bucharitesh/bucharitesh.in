import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Craft = GetTypeByName<typeof configuration, "crafts">;
export declare const allCrafts: Array<Craft>;

export type Post = GetTypeByName<typeof configuration, "posts">;
export declare const allPosts: Array<Post>;

export {};
