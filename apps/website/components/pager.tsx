// import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
// import Link from "next/link";

// import { buttonVariants } from "@repo/design-system/components/ui/button";
// import { cn } from "@/lib/utils";
// // import { Craft } from "content-collections";
// import { getInlineCrafts } from "@/lib/db/craft";

// interface CraftsPagerProps {
//   // craft: Craft;
// }

// export async function CraftsPager({ craft }: CraftsPagerProps) {
//   const pager = await getPagerForDoc(craft);

//   if (!pager) {
//     return null;
//   }

//   return (
//     <div className="flex flex-row items-center justify-between gap-4">
//       {pager?.prev?.href && (
//         <Link
//           href={pager.prev.href}
//           className={cn(buttonVariants({ variant: "outline-solid" }), "min-w-0")}
//           title={pager.prev.title}
//         >
//           <ChevronLeftIcon
//             className="mr-2 size-4 shrink-0"
//             aria-hidden="true"
//           />
//           <span className="truncate">{pager.prev.title}</span>
//         </Link>
//       )}
//       {pager?.next?.href && (
//         <Link
//           href={pager.next.href}
//           className={cn(
//             buttonVariants({ variant: "outline-solid" }),
//             "ml-auto min-w-0 text-right",
//           )}
//           title={pager.next.title}
//         >
//           <span className="truncate">{pager.next.title}</span>
//           <ChevronRightIcon
//             className="ml-2 size-4 shrink-0"
//             aria-hidden="true"
//           />
//         </Link>
//       )}
//     </div>
//   );
// }

// export async function getPagerForDoc(doc: Craft) {
//   const allCrafts = await getInlineCrafts();

//   // Get all crafts and sort them by date or any other criteria
//   const currentIndex = allCrafts.findIndex((craft) => craft.slug === doc.slug);

//   const prev = currentIndex > 0 ? allCrafts[currentIndex - 1] : null;
//   const next =
//     currentIndex < allCrafts.length - 1 ? allCrafts[currentIndex + 1] : null;

//   return {
//     prev: prev ? { href: `/craft/${prev.slug}`, title: prev.title } : null,
//     next: next ? { href: `/craft/${next.slug}`, title: next.title } : null,
//   };
// }
