import { PrismaClient } from '@prisma/client'
import { Category } from '../src/common/models/category'

const prisma = new PrismaClient()

async function main() {
  //   const home = await prisma.category.create({
  //     data: {
  //       name: 'Home',
  //     },
  //   })

  //   const food = await prisma.category.create({
  //     data: {
  //       name: 'Food',
  //     },
  //   })

  //   const delivery = await prisma.category.create({
  //     data: {
  //       name: 'Delivery',
  //       parentId: food.id,
  //     },
  //   })

  //   const user1 = await prisma.user.create({
  //     data: {
  //       name: 'User 1',
  //       friends: { create: [{ name: 'User 2' }, { name: 'User 3' }] },
  //     },
  //   })

  const users = await prisma.user.findMany({ include: { friends: true } })
  const categories = (await prisma.category.findMany({
    include: { subcategories: true },
  })) as Category[]

  console.log(categories[1])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
