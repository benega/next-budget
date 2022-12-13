import { Category } from '../../../../common/models/category'
import prisma from '../../../lib/prisma'

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

export const archive = async (categoryId: string, archive = true) => {
  const category = await prisma.category.update({
    data: {
      archived: archive,
    },
    where: { id: categoryId },
  })
  return category as Category
}
