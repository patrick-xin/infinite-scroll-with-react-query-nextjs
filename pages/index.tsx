import PostCard from '../src/components/PostCard'
import { data } from '../src/_mock_/data'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="grid-col-1 mx-auto grid gap-10 lg:grid-cols-2">
        {data.map((post, index) => (
          <PostCard {...post} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Home
