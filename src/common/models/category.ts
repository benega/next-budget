import { Category as CategoryPrisma } from '@prisma/client'

export type Category = CategoryPrisma & {
  subcategories: Category[]
}
