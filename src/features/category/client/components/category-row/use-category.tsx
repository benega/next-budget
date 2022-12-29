import { useState } from 'react'
import {
  AddCategory,
  CategoryFullModel,
  UpdateCategory,
  useAddCategoryMutation,
  useArchiveCategoryMutation,
  useUpdateCategoryMutation,
} from '../..'

export const useCategoryRow = (category: CategoryFullModel) => {
  const [showSubcategories, setShowSubcategories] = useState(false)
  const [archive, archiveResp] = useArchiveCategoryMutation()
  const [update, updateResp] = useUpdateCategoryMutation()
  const [add, addResp] = useAddCategoryMutation()

  return {
    hasSubcategories: (category?.subcategories?.length ?? 0) > 0,
    showSubcategories,
    isLoading:
      archiveResp.isLoading || updateResp.isLoading || addResp.isLoading,
    toggleShowSubcategories: () => setShowSubcategories(show => !show),

    archiveCategory: async () => {
      try {
        await archive(category).unwrap()
      } catch (err) {
        console.error('Failed to archive category', err)
      }
    },

    updateCategory: async (params: UpdateCategory.Params) => {
      try {
        await update(params).unwrap()
      } catch (err) {
        console.error('Failed to update category', err)
      }
    },

    addCategory: async (params: AddCategory.Params) => {
      try {
        await add(params).unwrap()
      } catch (err) {
        console.error('Failed to add category', err)
      }
    },
  }
}
