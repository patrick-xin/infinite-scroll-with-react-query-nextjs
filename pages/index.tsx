import type { NextPage } from 'next'
import PostCardLoader from '../src/components/PostCardLoader'

const Home: NextPage = () => {
  return (
    <div className="mx-auto h-screen max-w-4xl bg-gray-50">
      <div className="pt-12">
        <PostCardLoader />
      </div>
    </div>
  )
}

export default Home
