import { UTM_PARAMS } from '@/config/site';
import { cn } from '@/lib/utils';
import { Link2Icon } from 'lucide-react';

export const BookmarkCard = ({
  bookmark,
  order,
  className,
}: { bookmark: any; order: number; className?: string }) => {
  return (
    <a
      key={bookmark._id}
      className={cn(
        'flex aspect-auto min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl bg-background p-4 ring-2 ring-black/10 ring-inset ring-offset-destructive transition-colors duration-300 dark:ring-white/10',
        className
      )}
      href={`${bookmark.link}?utm_source=${UTM_PARAMS.utm_source}&utm_medium=${UTM_PARAMS.utm_medium}&utm_campaign=${UTM_PARAMS.utm_campaign}`}
      target="_blank"
      rel="noopener noreferrer"
      data-bookmark-order={order}
    >
      <span className="aspect-1200/630 overflow-hidden rounded-lg">
        <img
          src={bookmark.cover || '/assets/fallback.avif'}
          alt={bookmark.title}
          width={1200}
          height={630}
          loading={order < 2 ? 'eager' : 'lazy'}
          className="aspect-1200/630 animate-reveal rounded-lg bg-center bg-cover bg-no-repeat object-cover"
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = '/assets/fallback.avif';
          }}
        />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="line-clamp-4 text-lg text-muted-foreground leading-snug">
          {bookmark.title}
        </h2>
        <span className="line-clamp-4 inline-flex items-center gap-1 text-muted-foreground text-sm">
          <Link2Icon size={16} />
          {bookmark.domain}
        </span>
        <span className="line-clamp-6 text-muted-foreground/70 text-sm">
          {bookmark.excerpt || bookmark.note}
        </span>
      </div>
    </a>
  );
};
