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

export type ArchiveCategoryParams = {
  id: string
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<EntityState<Category>, void>({
      query: () => '/categories',
      transformResponse: (response: Category[]) => {
        return categoriesAdapter.setAll(initialState, response)
      },
    }),
    archive: builder.mutation<EntityState<Category>, ArchiveCategoryParams>({
      query: params => ({
        url: `/categories/${params.id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetCategoriesQuery, useArchiveMutation } = categoriesApiSlice

const selectCategoriesData = createSelector(
  categoriesApiSlice.endpoints.getCategories.select(),
  result => result.data
)

export const {
  selectAll: selectAllCategories,
  selectIds: selectCatagoryIds,
  selectById: selectCategoryById,
} = categoriesAdapter.getSelectors<RootState>(
  state => selectCategoriesData(state) ?? initialState
)
