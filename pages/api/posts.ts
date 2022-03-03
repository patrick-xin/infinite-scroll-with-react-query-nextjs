import prisma from '../../src/lib/prisma'

import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const take = 4
  const cursorQuery = (req.query.cursor as string) ?? undefined
  const skip = cursorQuery ? 1 : 0
  const cursor = cursorQuery ? { id: cursorQuery } : undefined

  try {
    const posts = await prisma.post.findMany({
      take,
      skip,
      cursor,
    })
    const nextId = posts.length === take ? posts[take - 1].id : undefined

    res.status(200).json({
      posts,
      nextId,
    })
  } catch (error) {
    res.status(400).end()
  }
}
export default handler
