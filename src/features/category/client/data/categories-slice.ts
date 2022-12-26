import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import {
  RootState,
  createTags,
  createTagsFromEntityState,
} from 'src/core/client/data'
import {
  AddCategory,
  FullCategory,
} from 'src/features/category/models/category'
import { apiSlice } from '../../../../core/client/data/api-slice'

const categoriesAdapter = createEntityAdapter<FullCategory>({
  //sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const initialState = categoriesAdapter.getInitialState()

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<EntityState<FullCategory>, void>({
      query: () => '/categories',
      transformResponse: (response: FullCategory[]) => {
        return categoriesAdapter.setAll(initialState, response)
      },
      providesTags: result =>
        createTagsFromEntityState('Category', 'LIST', result),
    }),
    archive: builder.mutation<EntityState<FullCategory>, FullCategory>({
      query: category => ({
        url: `/categories/${category.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, category) =>
        category.parentId
          ? createTags('Category', category.id, category.parentId)
          : createTags('Category', category.id),
    }),
    addNewCategory: builder.mutation<void, AddCategory>({
      query: addCategory => ({
        url: '/categories',
        method: 'POST',
        body: {
          ...addCategory,
        },
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useArchiveMutation,
  useAddNewCategoryMutation,
} = categoriesApiSlice

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
