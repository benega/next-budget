import prisma from '@/core/server/lib/prisma'
import { AddCategory, FullCategory } from '../../common'

export const fetchAll = async () => {
  const categories = await prisma.category.findMany({
    where: { parent: null, archived: false },
    include: {
      subcategories: {
        where: { archived: false },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  return categories as FullCategory[]
}

export const archive = async (categoryId: string, archive = true) => {
  const category = await prisma.category.update({
    data: {
      archived: archive,
    },
    where: { id: categoryId },
  })
  return category as FullCategory
}

export const create = async (addCategory: AddCategory) => {
  const category = (await prisma.category.create({
    data: addCategory,
  })) as FullCategory
  category.subcategories = []

  return category
}
