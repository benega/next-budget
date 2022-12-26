import type { Category as CategoryPrisma } from '@prisma/client'

export type FullCategory = CategoryPrisma & {
  subcategories: FullCategory[]
}

export type AddCategory = Omit<
  CategoryPrisma,
  'id' | 'createdAt' | 'updatedAt' | 'archived'
>
