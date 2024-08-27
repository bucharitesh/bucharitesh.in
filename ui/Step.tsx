export default function Step({
  number,
  title,
}: {
  number: string
  title: string
}) {
  return (
    <div className="step flex items-center py-4">
      <div className="flex items-center justify-center border border-primary-200 font-bold dark:border-primary-900 rounded-full h-8 w-8 text-primary-500">
        {number}
      </div>
      <h3 className="ml-3 tracking-tight font-bold">{title}</h3>
    </div>
  )
}
