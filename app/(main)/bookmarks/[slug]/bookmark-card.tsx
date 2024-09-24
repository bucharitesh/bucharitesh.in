import { Link2Icon } from "lucide-react"

export const BookmarkCard = ({ bookmark, order }) => {
  return (
    <a
      key={bookmark._id}
      className="thumbnail-shadow flex aspect-auto min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl bg-primary-700/40 p-4 transition-colors duration-300 hover:bg-primary-800"
      href={`${bookmark.link}?ref=bucharitesh.in`}
      target="_blank"
      rel="noopener noreferrer"
      data-bookmark-order={order}
    >
      <span className="aspect-[1200/630] overflow-hidden rounded-lg">
        <img
          src={bookmark.cover || "/assets/fallback.avif"}
          alt={bookmark.title}
          width={1200}
          height={630}
          loading={order < 2 ? "eager" : "lazy"}
          className="aspect-[1200/630] animate-reveal rounded-lg border bg-cover bg-center bg-no-repeat object-cover"
          //   onError={(e) => {
          //     // e.target.onerror = null
          //     // e.target.src = "/assets/fallback.avif"
          //   }}
          // eslint-disable-next-line react/no-unknown-property
          //   nopin="nopin"
        />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="line-clamp-4 text-lg leading-snug">{bookmark.title}</h2>
        <span className="line-clamp-4 inline-flex items-center gap-1 text-sm text-primary-300">
          <Link2Icon size={16} />
          {bookmark.domain}
        </span>
        <span className="line-clamp-6 text-sm">
          {bookmark.excerpt || bookmark.note}
        </span>
      </div>
    </a>
  )
}
