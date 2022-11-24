import { nanoid } from '@reduxjs/toolkit'
import { Category } from '../../../common/models/category'

const categories: Category[] = [
  { id: nanoid(), name: 'Home' },
  { id: nanoid(), name: 'Car' },
  { id: nanoid(), name: 'Food' },
  { id: nanoid(), name: 'Personal' },
  { id: nanoid(), name: 'Subscriptions' },
  { id: nanoid(), name: 'Charity' },
  { id: nanoid(), name: 'Gifts' },
  { id: nanoid(), name: 'Others' },
]

export const categoriesApi = {
  getAll: () => [...categories],
}
