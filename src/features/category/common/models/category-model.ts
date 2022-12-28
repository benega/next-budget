import type { Category } from '@prisma/client'

export type CategoryModel = Category

export type CategoryFullModel = Category & {
  subcategories: CategoryFullModel[]
}

export type CategoryEditableData = Pick<Category, 'name'>
