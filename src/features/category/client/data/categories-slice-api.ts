import { RootState } from 'src/core/client/data'
import { Category } from 'src/features/category/models/category'
import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit'
import { apiSlice } from '../../../../core/client/data/api-slice'

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
