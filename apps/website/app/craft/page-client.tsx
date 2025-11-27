'use client';

import { analytics } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export interface MediaContentProps {
  src: string;
  title: string;
  date: string;
  href: string;
  craft_type: string;
  theme: string;
  position?: string;
  className?: string;
  blurImage: string | null;
  type?: 'image' | 'video';
  aspectRatio?: number;
}

export const Card = ({
  title,
  date,
  src,
  href,
  craft_type,
  theme,
  aspectRatio = 4 / 3,
  position = 'bottom',
  className = '',
  blurImage,
  type = 'video',
}: MediaContentProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = type === 'video';
  const showContent = isVideo ? isVideoLoaded : isImageLoaded;

  useEffect(() => {
    if (!isVideo) {
      return;
    }

    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }

    const handleLoaded = () => {
      if (videoElement.readyState >= 3) {
        setIsVideoLoaded(true);
      }
    };

    videoElement.addEventListener('loadeddata', handleLoaded);
    videoElement.addEventListener('canplay', handleLoaded);
    videoElement.addEventListener('playing', handleLoaded);

    if (videoElement.readyState >= 3) {
      handleLoaded();
    }

    return () => {
      videoElement.removeEventListener('loadeddata', handleLoaded);
      videoElement.removeEventListener('canplay', handleLoaded);
      videoElement.removeEventListener('playing', handleLoaded);
    };
  }, [isVideo]);

  return (
    <div
      className={cn(
        'block w-full overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-200 dark:border-neutral-800 dark:bg-neutral-900',
        className,
        {
          'p-1': craft_type !== 'none',
        }
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          'after:pointer-events-none after:absolute after:bottom-[-64px] after:h-[200px] after:w-full after:bg-linear-to-t after:from-black/90 after:via-transparent after:to-transparent after:transition-opacity after:duration-200 after:content-[""]',
          {
            'rounded-lg': craft_type !== 'none',
          }
        )}
      >
        <div className="relative w-full" style={{ aspectRatio: aspectRatio }}>
          {/* Blur image - only show for videos */}
          {isVideo && blurImage && (
            <img
              aria-hidden="true"
              className={cn(
                'absolute inset-0 h-full w-full transition-opacity duration-300',
                {
                  'opacity-0': showContent,
                  'opacity-100': !showContent,
                }
              )}
              src={blurImage ?? ''}
              style={{
                filter: 'blur(32px)',
                transform: 'scale(1) translateZ(0px)',
              }}
              alt=""
            />
          )}

          {/* Main content: either video or image */}
          {isVideo ? (
            <video
              ref={videoRef}
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
                {
                  'opacity-0': !isVideoLoaded,
                  'opacity-100': isVideoLoaded,
                }
              )}
            />
          ) : (
            <img
              src={src}
              onLoad={() => setIsImageLoaded(true)}
              className="absolute inset-0 h-full w-full object-cover"
              alt={title}
            />
          )}
        </div>

        {/* Title and metadata */}
        <div
          className={cn(
            'absolute bottom-2 left-0 z-20 flex h-8 w-full flex-row flex-nowrap items-center justify-between gap-3 whitespace-nowrap p-4 transition-opacity delay-200',
            {
              'top-2': position === 'top',
              'bottom-2': position === 'bottom',
            }
          )}
        >
          <div
            className={cn(
              'overflow-hidden text-ellipsis whitespace-nowrap text-sm',
              {
                'text-neutral-100': theme === 'light',
                'text-neutral-900': theme === 'dark',
              }
            )}
          >
            {title}
          </div>
          <div
            className={cn(
              'overflow-hidden text-ellipsis whitespace-nowrap text-sm',
              {
                'text-neutral-400': theme === 'light',
                'text-neutral-800/60': theme === 'dark',
              }
            )}
          >
            {date}
          </div>
        </div>
      </div>

      {/* Action button */}
      {craft_type !== 'none' && (
        <Link
          href={href}
          target={href?.startsWith('http') ? '_blank' : undefined}
          data-fake-button
          onClick={() => analytics.trackCraftItemClick(title, href, craft_type)}
          className="mt-1 flex h-10 items-center justify-center gap-1.5 rounded-lg bg-neutral-100 font-medium text-neutral-900 text-sm transition-colors duration-150 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 "
        >
          {craft_type === 'project'
            ? 'View Live'
            : craft_type === 'component'
              ? 'View Prototype'
              : 'Read Article'}
          <ArrowRight
            size={16}
            className={href?.startsWith('http') ? '-rotate-45' : ''}
          />
        </Link>
      )}
    </div>
  );
};
