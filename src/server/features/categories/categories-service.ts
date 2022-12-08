import prisma from '../../app/data/prisma'

export const fetchAll = async () => {
  const categories = await prisma.category.findMany({
    where: { parent: null, archived: false },
    include: {
      subcategories: {
        where: { archived: false },
      },
    },
  })
  return categories
}
