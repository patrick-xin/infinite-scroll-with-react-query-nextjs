import Image from 'next/image'

import type { Post } from '@prisma/client'

type PostCardProps = Omit<Post, 'id' | 'createdAt' | 'createdAt'>

const PostCard = ({ title, content, imageUrl }: PostCardProps) => {
  return (
    <div className="mx-auto max-w-md rounded bg-white p-6 shadow-md">
      <Image
        className="rounded-md shadow-md"
        layout="fixed"
        height={320}
        width={400}
        src={imageUrl}
        objectFit="cover"
        priority
      />
      <h1 className="my-4 text-3xl font-bold">{title}</h1>
      <p className="text-gray-700">{content}</p>
    </div>
  )
}

export default PostCard
