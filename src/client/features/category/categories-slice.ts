import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { Category } from '../../../common/models/category'
import { ApiStatus } from '../../../common/types/api-status'

export type CategoriesState = {
  categories: Category[]
  status: ApiStatus
  error?: string
}

const initialState: CategoriesState = {
  categories: [],
  status: 'idle',
}

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async () => {
    return [
      { id: nanoid(), name: 'Home' },
      { id: nanoid(), name: 'Car' },
      { id: nanoid(), name: 'Food' },
      { id: nanoid(), name: 'Personal' },
      { id: nanoid(), name: 'Subscriptions' },
      { id: nanoid(), name: 'Charity' },
      { id: nanoid(), name: 'Gifts' },
      { id: nanoid(), name: 'Others' },
    ]
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoryAdded(state, action: PayloadAction<Category>) {
      state.categories.push({ ...action.payload, id: nanoid() })
    },
    categoryArchived(state, action: PayloadAction<Category>) {
      state.categories = state.categories.filter(c => c.id != action.payload.id)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message
      })
  },
})

export const selectAllCategories = (state: CategoriesState) => state.categories

export const { categoryAdded, categoryArchived } = categoriesSlice.actions
export default categoriesSlice.reducer
