import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { Category } from '../../../common/models/category'
import { ApiStatus } from '../../../common/types/api-status'
import { RootState } from '../../app/store'
import { categoriesApi } from './categories-api'

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
    console.log('categories/fetchAll')
    return categoriesApi.getAll()
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoryAdded(state, action: PayloadAction<Category>) {
      categoriesAdapter.upsertOne(state, { ...action.payload, id: nanoid() })
    },
    categoryArchived(state, action: PayloadAction<Category>) {
      categoriesAdapter.removeOne(state, action.payload.id)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        categoriesAdapter.upsertMany(state, action.payload)
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
