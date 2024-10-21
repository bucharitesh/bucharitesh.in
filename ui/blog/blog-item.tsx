import { formatPostPreview } from "@/lib/contentlayer";
import { Timer } from "lucide-react";
import { Link } from "next-view-transitions";
// import { InlineMetric } from "./inline-metric";

// export const BlogItem = (post: ReturnType<typeof formatPostPreview>) => {
//   return (
//     <Link
//       href={`/blog/${post.slug}`}
//       className="flex gap-x-4 px-4 -mx-4 pt-4 rounded-[12px] border-none hover:bg-primary group"
//     >
//       <div className="grid grid-cols-4 items-end justify-between gap-2 text-sm border-b border-primary flex-auto pb-4 group-hover:border-transparent text-primary">
//         <div className="flex flex-col justify-between gap-2 items-start col-span-3">
//           <div>{post.title}</div>
//           <div className="line-clamp-2 w-3/4 text-xs text-primary/40">
//             {post.description}
//           </div>
//         </div>
//         {/* <div className="text-primary/60 tabular-nums">2023 – Now&nbsp;</div> */}
//         <div className="text-primary/60 flex flex-col h-max justify-between gap-x-2 items-center">
//           <div className="flex items-center gap-1 text-sm">
//             <Timer className="h-3 w-3" />
//             {post.readingTime}
//           </div>
//           <div className="text-xs text-primary/30">
//             {post.publishedAtFormatted}
//           </div>
//         </div>

//         {/* <div className="text-primary/30">&middot;</div>
//           <div>
//             <InlineMetric key={post.views} stat={post.views} /> views
//           </div>
//           <div className="text-primary/30">&middot;</div>
//           <div>
//             <InlineMetric key={post.likes} stat={post.likes} /> likes
//           </div> */}
//       </div>
//     </Link>
//   )
// }

// export const BlogItem = (post: ReturnType<typeof formatPostPreview>) => {
//   return (
//     <Link
//       href={`/blog/${post.slug}`}
//       className="flex gap-x-4 px-4 -mx-4 pt-4 rounded-[12px] border-none hover:bg-primary group"
//     >
//       <div className="flex flex-col justify-between gap-3 w-full border-b border-primary flex-auto pb-4 group-hover:border-transparent text-primary-400/80">
//         <div className="flex flex-col gap-1">
//           <div className="text-base">{post.title}</div>
//           <div className="flex flex-wrap items-center space-x-1 tabular-nums text-xs text-primary/40 lowercase">
//             <div>{post.publishedAtFormatted}</div>
//             <div className="text-primary/30">&middot;</div>
//             <div className="flex items-center gap-1">
//               <Timer className="h-3 w-3" />
//               {post.readingTime}
//             </div>
//           </div>
//         </div>
//         {post.description ? (
//           <div className="text-xs w-7/8 text-primary/40 line-clamp-2">
//             {post.description}
//           </div>
//         ) : null}
//       </div>
//     </Link>
//   )
// }

export const BlogItem = (post: ReturnType<typeof formatPostPreview>) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex gap-x-4 px-4 pt-4 rounded-[12px] border-none bg-white/5 hover:bg-primary/50 group transition-all"
    >
      <div className="flex flex-col justify-between gap-3 w-full flex-auto pb-4 group-hover:border-transparent">
        <div className="flex flex-col gap-1">
          <div className="text-base">{post.title}</div>
          <div className="flex flex-wrap items-center space-x-1 tabular-nums text-xs lowercase">
            <div>{post.publishedAtFormatted}</div>
            <div className="text-primary/30">&middot;</div>
            <div className="flex items-center gap-1">
              <Timer className="h-3 w-3" />
              {post.readingTime}
            </div>
          </div>
        </div>
        {post.description ? (
          <div className="text-xs w-7/8 text-primary/70 line-clamp-2">
            {post.description}
          </div>
        ) : null}
      </div>
    </Link>
  );
};
