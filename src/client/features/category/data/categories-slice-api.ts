import { RootState } from '@/client/data'
import { Category } from '@/common/models/category'
import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit'
import { apiSlice } from '../../api/api-slice'

const categoriesAdapter = createEntityAdapter<Category>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const initialState = categoriesAdapter.getInitialState()

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<EntityState<Category>, void>({
      query: () => '/categories',
      transformResponse: (response: Category[]) => {
        return categoriesAdapter.setAll(initialState, response)
      },
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApiSlice

const selectCategoriesData = createSelector(
  categoriesApiSlice.endpoints.getCategories.select(),
  result => result.data
)

export const { selectAll: selectAllCategories, selectIds: selectCatagoryIds } =
  categoriesAdapter.getSelectors<RootState>(
    state => selectCategoriesData(state) ?? initialState
  )
