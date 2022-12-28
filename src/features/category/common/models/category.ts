import type { Category as CategoryPrisma } from '@prisma/client'

export type Category = CategoryPrisma

export type FullCategory = CategoryPrisma & {
  subcategories: FullCategory[]
}

export type CategoryEditableData = Pick<CategoryPrisma, 'name'>
