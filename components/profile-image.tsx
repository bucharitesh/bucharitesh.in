import { meta } from "@/lib/config";
import Image from "next/image";
import { Icons } from "./icons";

export const SelfImage = () => (
    <Image
      src={meta.image.animated}
      quality={95}
      width={64}
      height={64}
      priority={true}
      className="rounded-full bg-white"
      alt={`A photo of ${meta.name}`}
    />
);

export const ProfileImage = () => {
  return (
    <div
    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex-shrink-0"
    style={{ aspectRatio: "1 / 1" }}
  >
      <Icons.winter_hat className="absolute -top-2/3 left-3 h-14 w-14 sm:h-16 sm:w-16" />
      <SelfImage />
    </div>
  );
};
