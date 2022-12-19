import { RootState } from 'src/core/client/data'
import { ApiStatus, httpClient } from 'src/core/client/lib'
import { Category } from 'src/features/category/models/category'
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

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
    const res = await httpClient.get<Category[]>('/api/categories')
    console.log('categories/fetchAll', res.data)
    return res.data ?? []
  }
)

export const archiveCategory = createAsyncThunk(
  'categories/archive',
  async (category: Category) => {
    const res = await httpClient.delete<Category>(
      `/api/categories/${category.id}`
    )
    console.log('categories/delete', res.data)
    return res.data
  }
)

const { selectById: getCategoryById } = categoriesAdapter.getSelectors()

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoryAdded(state, action: PayloadAction<string>) {
      console.log('categoryAdded', action.payload)
      // categoriesAdapter.upsertOne(state, { ...action.payload, id: nanoid() })
    },
    // categoryArchived(state, action: PayloadAction<Category>) {
    //   const category = action.payload
    //   if (!category.parentId) {
    //     categoriesAdapter.removeOne(state, category.id)
    //   } else {
    //     const mainCategory = getCategoryById(state, category.parentId)
    //     if (mainCategory)
    //       categoriesAdapter.updateOne(state, {
    //         id: mainCategory.id,
    //         changes: {
    //           subcategories: mainCategory.subcategories.filter(
    //             c => c.id !== category.id
    //           ),
    //         },
    //       })
    //   }
    // },
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
      .addCase(archiveCategory.fulfilled, (state, action) => {
        const category = action.payload
        console.log('')
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
      })
  },
})

export const {
  selectIds: selectCategoriesIds,
  selectById: selectCategoryById,
} = categoriesAdapter.getSelectors<RootState>(state => state.categories)

export const getCategoriesStatus = (state: RootState) => state.categories.status
export const getCategoriesError = (state: RootState) => state.categories.error

export const { categoryAdded } = categoriesSlice.actions
export default categoriesSlice.reducer
