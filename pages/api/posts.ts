import prisma from '../../src/lib/prisma'

import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const limit = 4
  const cursorQuery = (req.query.cursor as string) ?? undefined
  const skip = cursorQuery ? 1 : 0
  const cursor = cursorQuery ? { id: cursorQuery } : undefined

  try {
    const posts = await prisma.post.findMany({
      take: limit,
      skip,
      cursor,
    })

    res.status(200).json({
      posts,
      nextId: posts.length === limit ? posts[limit - 1].id : undefined,
    })
  } catch (error) {
    res.status(400).end()
  }
}
export default handler
