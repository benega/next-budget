import {
  RootState,
  apiSlice,
  createTags,
  createTagsFromEntityState,
} from '@/core/client/data'
import {
  AddCategory,
  ArchiveCategory,
  CategoryFullModel,
  FetchCategories,
  UpdateCategory,
} from '@/features/category/client'
import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'

const categoriesAdapter = createEntityAdapter<CategoryFullModel>()
const initialState = categoriesAdapter.getInitialState()

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<EntityState<FetchCategories.Model>, void>({
      query: () => '/categories',
      transformResponse: (response: CategoryFullModel[]) => {
        return categoriesAdapter.setAll(initialState, response)
      },
      providesTags: result =>
        createTagsFromEntityState('Category', 'LIST', result),
    }),
    archiveCategory: builder.mutation<
      EntityState<ArchiveCategory.Model>,
      ArchiveCategory.Params
    >({
      query: params => ({
        url: `/categories/${params.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, params) =>
        createTags('Category', params.id, params.parentId),
    }),
    addCategory: builder.mutation<void, AddCategory.Params>({
      query: params => ({
        url: '/categories',
        method: 'POST',
        body: {
          ...params,
        },
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    updateCategory: builder.mutation<void, UpdateCategory.Params>({
      query: params => ({
        url: `/categories/${params.id}`,
        method: 'PATCH',
        body: {
          ...params.changes,
        },
      }),
      invalidatesTags: createTags('Category', 'LIST'),
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useArchiveCategoryMutation,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
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
