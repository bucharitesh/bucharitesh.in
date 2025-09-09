import { UTM_PARAMS } from '@/config/site'
import { Link2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

export const BookmarkCard = ({ bookmark, order, className }: { bookmark: any, order: number, className?: string }) => {
  return (
    <a
      key={bookmark._id}
      className={cn("thumbnail-shadow flex aspect-auto min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl bg-white p-4 transition-colors duration-300", className)}
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
          className="animate-reveal aspect-1200/630 rounded-lg border bg-cover bg-center bg-no-repeat object-cover"
          onError={(e : any) => {
            e.target.onerror = null
            e.target.src = '/assets/fallback.avif'
          }}
        />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="line-clamp-4 text-lg leading-snug">{bookmark.title}</h2>
        <span className="line-clamp-4 inline-flex items-center gap-1 text-sm text-gray-500">
          <Link2Icon size={16} />
          {bookmark.domain}
        </span>
        <span className="line-clamp-6 text-sm">{bookmark.excerpt || bookmark.note}</span>
      </div>
    </a>
  )
}