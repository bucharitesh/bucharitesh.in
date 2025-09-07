import { meta } from "@/lib/config";
import Image from "next/image";

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

export const ProfileImage = () => {
  return (
    <div
      className="relative size-20 mx-[2px] my-[3px]"
    >
      <img
        src={meta.image.profile}
        fetchPriority="high"
        className="h-full w-full rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none"
        alt={`A photo of ${meta.name}`}
      />
    </div>
  );
};
