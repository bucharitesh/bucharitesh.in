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
      className="relative size-10 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-20 shrink-0"
      style={{ aspectRatio: "1 / 1" }}
    >
      <Image
        src={meta.image.profile}
        fill
        priority={true}
        className="rounded-full bg-secondary"
        alt={`A photo of ${meta.name}`}
      />
    </div>
  );
};
