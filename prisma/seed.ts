import { PrismaClient } from '@prisma/client'
import { data } from '../src/_mock_/data'

const prisma = new PrismaClient()

async function main() {
  await prisma.post.createMany({
    data,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
