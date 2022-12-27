import { PrismaClient } from '@prisma/client'

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

  // let cat1 = await prisma.category.findFirst({
  //   where: {
  //     name: 'Category 1',
  //   },
  // })

  // if (cat1) {
  //   cat1 = await prisma.category.update({
  //     where: {
  //       id: cat1.id,
  //     },
  //     data: {
  //       subcategories: {
  //         create: {
  //           name: 'Category 1.4',
  //         },
  //       },
  //     },
  //     include: {
  //       subcategories: true,
  //     },
  //   })

  //   console.log(JSON.stringify(cat1, null, 4))
  // }

  await prisma.category.updateMany({
    where: {
      archived: true,
    },
    data: {
      archived: false,
    },
  })

  //   await prisma.category.update({
  //     where: {
  //       id: cat1.id,
  //     },
  //     data: {
  //       subcategories: {
  //         create: {
  //           name: 'Category 1.1',
  //         },
  //       },
  //     },
  //   })

  //   await prisma.category.update({
  //     where: {
  //       id: cat1.id,
  //     },
  //     data: {
  //       subcategories: {
  //         create: {
  //           name: 'Category 1.2',
  //         },
  //       },
  //     },
  //   })

  //   const categories = await prisma.category.findMany({
  //     where: {
  //       parent: null,
  //     },
  //     include: { subcategories: true, parent: true },
  //   })

  //   console.log(JSON.stringify(categories, null, 4))
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
