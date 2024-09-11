"use client"

import React from "react"
import { useComments } from "@/lib/hooks/use-comments"
import Image from "next/image"
import { format } from "date-fns"
import LoginButton from "./sign-in-button"
import { TrashIcon } from "lucide-react"
import { LoadingSkeleton } from "@/ui/mdx/loading-skeleton"

const PageClient = ({ session }: any) => {
  const { comments, onDelete, loading } = useComments()

  return (
    <>
      <LoginButton />
      <div className="relative my-4  h-px w-full border-b border-primary-200">
        <span className="absolute -bottom-px left-px h-px w-[40%] bg-gradient-to-r from-primary-400/0 via-primary/40 to-primary-400/0"></span>
      </div>
      <CommentsList
        loading={loading}
        comments={comments}
        onDelete={onDelete}
        session={session}
      />
    </>
  )
}

function CommentsList({
  loading,
  comments,
  onDelete,
  session,
}: {
  loading: boolean
  comments: any
  onDelete: any
  session: any
}) {
  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="mt-4 space-y-8">
      {comments?.map((comment: any) => (
        <WordsEntry
          key={comment.id}
          comment={comment}
          user={session}
          handleDelete={() => onDelete(comment)}
        />
      ))}
      {comments && comments?.length === 0 && <p>No comments yet !!</p>}
    </div>
  )
}

function WordsEntry({ comment, user, handleDelete }: any) {
  return (
    <div className="relative flex w-full flex-col space-y-4">
      <div className="prose w-full break-words prose-dark text-primary-300">
        {comment.message}
      </div>
      <div className="flex items-center space-x-3">
        <Image
          src={comment.image}
          width="30"
          height="30"
          objectFit="cover"
          className="rounded-full border-none outline-none ring-1 ring-primary-400 ring-offset-1 ring-offset-transparent"
          alt=""
        />

        <p className="text-sm text-primary-600/90">{comment.name}</p>

        <span className="text-primary-400">/</span>

        <p className="text-sm text-primary-600/90">
          {format(new Date(comment.createdAt), "d MMM yyyy 'at' h:mm bb")}
        </p>

        {user && comment.name === user.user.name && (
          <>
            <span className="text-primary-400">/</span>
            <button onClick={handleDelete}>
              <TrashIcon className="h-4 w-4 text-primary-500" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default PageClient
