import prisma from '@/core/server/lib/prisma'
import {
  AddCategory,
  ArchiveCategory,
  FetchCategories,
  UpdateCategory,
} from '../../common'

export const fetchCategories = async () => {
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
  return categories as FetchCategories.Model[]
}

export const archiveCategory = async (categoryId: string, archive = true) => {
  const category = await prisma.category.update({
    data: {
      archived: archive,
    },
    where: { id: categoryId },
  })
  return category as ArchiveCategory.Model
}

export const addCategory = async (params: AddCategory.Params) => {
  const category = await prisma.category.create({
    data: params,
  })

  return category as AddCategory.Model
}

export const updateCategory = async (params: UpdateCategory.Params) => {
  const category = await prisma.category.update({
    where: {
      id: params.id,
    },
    data: params.changes,
    include: {
      subcategories: true,
    },
  })

  return category as UpdateCategory.Model
}
