import { meta } from "@/lib/config";
import Image from "next/image";
import { Icons } from "./icons";
import { getCurrentSeason } from "@/lib/utils";

export const SelfImage = () => (
  <Image
    src={meta.image.animated}
    width={64}
    height={64}
    priority={true}
    className="rounded-full bg-white"
    alt={`A photo of ${meta.name}`}
  />
);

export const ProfileImage = async () => {
  const season = await getCurrentSeason();

  return (
    <div
      className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex-shrink-0"
      style={{ aspectRatio: "1 / 1" }}
    >
      {season === "winter" && (
        <Icons.winter_hat className="absolute z-1 -top-2/3 left-3 h-14 w-14 sm:h-16 sm:w-16" />
      )}
      {/* flipping image on hover */}
      <div className="absolute z-0 inset-0 [perspective:1000px] group">
        <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front */}
          <div className="absolute inset-0 rounded-full [backface-visibility:hidden]">
            <Image
              src={meta.image.animated}
              width={64}
              height={64}
              priority={true}
              className="rounded-full bg-white"
              alt={`A photo of ${meta.name}`}
            />
          </div>
          {/* Back */}
          <div className="absolute inset-0 rounded-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <Image
              src={meta.image.profile}
              width={64}
              height={64}
              priority={true}
              className="rounded-full bg-white"
              alt={`A photo of ${meta.name}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
