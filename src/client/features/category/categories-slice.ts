import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { Category } from '../../../common/models/category'

import { ApiStatus } from '../../../common/types/api-status'
import { RootState } from '../../app/store'

export type CommonEntityState = {
  status: ApiStatus
  error?: string
}

const categoriesAdapter = createEntityAdapter<Category>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const initialState = categoriesAdapter.getInitialState<CommonEntityState>({
  status: 'idle',
})

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async () => {
    const res = await axios.get<Category[]>('/api/categories')
    console.log('categories/fetchAll', res.data)
    return res.data ?? []
  }
)

const { selectById: getCategoryById } = categoriesAdapter.getSelectors()

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoryAdded(state, action: PayloadAction<Category>) {
      categoriesAdapter.upsertOne(state, { ...action.payload, id: nanoid() })
    },
    categoryArchived(state, action: PayloadAction<Category>) {
      const category = action.payload
      if (!category.parentId) {
        categoriesAdapter.removeOne(state, category.id)
      } else {
        const mainCategory = getCategoryById(state, category.parentId)
        if (mainCategory)
          categoriesAdapter.updateOne(state, {
            id: mainCategory.id,
            changes: {
              subcategories: mainCategory.subcategories.filter(
                c => c.id !== category.id
              ),
            },
          })
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        categoriesAdapter.upsertMany(state, action.payload ?? [])
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message
      })
  },
})

export const {
  selectIds: selectCategoriesIds,
  selectById: selectCategoryById,
} = categoriesAdapter.getSelectors<RootState>(state => state.categories)

export const getCategoriesStatus = (state: RootState) => state.categories.status
export const getCategoriesError = (state: RootState) => state.categories.error

export const { categoryAdded, categoryArchived } = categoriesSlice.actions
export default categoriesSlice.reducer
