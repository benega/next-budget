import { useState } from 'react'
import {
  CategoryFullModel,
  UpdateCategory,
  useArchiveCategoryMutation,
  useUpdateCategoryMutation,
} from '../..'

export const useCategoryRow = (category: CategoryFullModel) => {
  const [showSubcategories, setShowSubcategories] = useState(false)
  const [archive, archiveResp] = useArchiveCategoryMutation()
  const [update, updateResp] = useUpdateCategoryMutation()

  return {
    hasSubcategories: (category?.subcategories?.length ?? 0) > 0,
    showSubcategories,
    isLoading: archiveResp.isLoading || updateResp.isLoading,
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
  }
}
