import { FOCUS_VISIBLE_OUTLINE } from "@/old/lib/constants";
import { Nav } from "@/ui/Nav";
import { ProfileImage } from "@/ui/ProfileImage";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

export function SiteHeader() {
  return (
    <div className="rounded-2xl bg-gray-800/95 py-2 pl-2.5 pr-6 shadow-surface-glass backdrop-blur [@supports(backdrop-filter:blur(0px))]:bg-white/[3%]">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          title="Navigate home"
          className={cn("rounded-full", FOCUS_VISIBLE_OUTLINE)}
        >
          <ProfileImage />
        </Link>
        <Nav />
      </div>
    </div>
  );
}
