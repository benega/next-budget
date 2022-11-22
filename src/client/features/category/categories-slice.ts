import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../../../common/models/category'
import { v4 as uuidv4 } from 'uuid'

export type CategoriesState = {
  categories: Category[]
}

const initialState: CategoriesState = {
  categories: [
    { id: uuidv4(), name: 'Home' },
    { id: uuidv4(), name: 'Car' },
    { id: uuidv4(), name: 'Food' },
    { id: uuidv4(), name: 'Personal' },
    { id: uuidv4(), name: 'Subscriptions' },
    { id: uuidv4(), name: 'Charity' },
    { id: uuidv4(), name: 'Gifts' },
    { id: uuidv4(), name: 'Others' },
  ],
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Category>) {
      state.categories.push(action.payload)
    },
  },
})

export const { add } = categoriesSlice.actions
export default categoriesSlice.reducer
