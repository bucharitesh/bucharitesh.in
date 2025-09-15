import { USER } from '@/config/user';
import Image from 'next/image';

export const SelfImage = () => (
  <Image
    src={USER.image.profile}
    width={64}
    height={64}
    priority={true}
    className="rounded-full bg-white"
    alt={`A photo of ${USER.name}`}
  />
);

export const ProfileImage = () => {
  return (
    <div className="relative mx-[2px] my-[3px] size-20">
      <img
        src={USER.image.profile}
        fetchPriority="high"
        className="h-full w-full select-none rounded-full bg-secondary ring-1 ring-border ring-offset-2 ring-offset-primary"
        alt={`Profile of ${USER.name}`}
      />
    </div>
  );
};
