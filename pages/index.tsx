import type { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'

import PostCardLoader from '../src/components/PostCardLoader'
import PostCard from '../src/components/PostCard'

import type { Post } from '@prisma/client'

const getPosts = async ({
  pageParam = '',
}: {
  pageParam?: string
}): Promise<{ posts: Post[]; nextId: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const res = await fetch(`http://localhost:3000/api/posts?cursor=${pageParam}`)
  const data = await res.json()

  return data
}

const Home: NextPage = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(['posts'], getPosts, {
    getNextPageParam: (lastPage) => lastPage.nextId ?? false,
  })

  const { inView, ref } = useInView({ rootMargin: '200px' })
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  return (
    <div className="mx-auto max-w-4xl bg-gray-50">
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
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['posts'], getPosts)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
