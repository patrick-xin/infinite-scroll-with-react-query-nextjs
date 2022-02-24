import { PrismaClient } from '@prisma/client'
import faker from '@faker-js/faker'
const prisma = new PrismaClient()

async function main() {
  const data = Array.from(Array(40).keys()).map((_) => {
    return { title: faker.lorem.text(), content: faker.lorem.paragraphs() }
  })

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
