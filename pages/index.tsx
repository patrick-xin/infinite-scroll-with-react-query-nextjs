import { useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'

import PostCardLoader from '../src/components/PostCardLoader'
import PostCard from '../src/components/PostCard'
import prisma from '../src/lib/prisma'

import type { GetServerSideProps } from 'next'
import type { Post } from '@prisma/client'

const getPosts = async ({
  pageParam = '',
}: {
  pageParam: string
}): Promise<{ posts: Post[]; nextId: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const res = await fetch(`/api/posts?cursor=${pageParam}`)
  const data = await res.json()

  return data
}

const Home = ({
  initialData,
  nextId,
}: {
  initialData: Post[]
  nextId: string
}) => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['posts'],
    ({ pageParam = nextId }) => getPosts({ pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  )

  const { inView, ref } = useInView({ threshold: 1, rootMargin: '0px' })
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  return (
    <div className="mx-auto max-w-4xl bg-gray-50">
      <div className="m-6 mx-auto grid grid-cols-2 gap-6">
        {initialData.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      {posts &&
        posts.pages?.flatMap((page, i) => {
          return (
            <div key={i} className="m-6 mx-auto grid grid-cols-2 gap-6">
              {page.posts.map((post) => {
                return <PostCard key={post.id} {...post} />
              })}
            </div>
          )
        })}

      {isFetchingNextPage && <PostCardLoader />}
      <div
        className="mx-auto flex max-w-6xl justify-center opacity-0"
        ref={ref}
      />
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    take: 4,
    select: { content: true, title: true, imageUrl: true, id: true },
  })
  const nextId = posts[3].id
  return {
    props: {
      initialData: posts,
      nextId,
    },
  }
}
