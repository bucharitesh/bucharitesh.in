import { meta } from "@/lib/constants"
import Image from "next/image"

const SelfImage = () => (
  <Image
    src={meta.image.profile}
    quality={95}
    width={64}
    height={64}
    priority={true}
    className="rounded-full bg-white"
    alt={`A photo of ${meta.name}`}
  />
)

export const ProfileImage = () => {
  return (
    <div className="group transform rounded-full bg-gradient-to-tl from-primary-700/60 to-primary-400/60 p-0.5 shadow-lg transition ease-out hover:scale-105 hover:from-primary-700 hover:to-primary-400 hover:shadow-primary-500/25 active:translate-y-px">
      <div className="h-[36px] w-[36px] rounded-full p-px transition duration-300 group-hover:scale-105">
        <SelfImage />
      </div>
    </div>
  )
}

export const ProfileImageLarge = () => {
  return (
    <div className="relative">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-primary-700/60 to-primary-400/60 ring-[10px] ring-primary-500/10 animate-[pulse_4s_ease-in-out_infinite]"></div>

      {/* Inner ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-primary-700/60 to-primary-400/60 ring-[5px] ring-primary-500/50 animate-[pulse_2s_ease-in-out_infinite]"></div>

      {/* Image container */}
      <div className="relative rounded-full">
        <SelfImage />
      </div>
    </div>
  )
}