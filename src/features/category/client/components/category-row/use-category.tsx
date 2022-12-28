import { useState } from 'react'
import { CategoryEditableData, FullCategory, useArchiveMutation } from '../..'

export const useCategoryRow = (category: FullCategory) => {
  const [showSubcategories, setShowSubcategories] = useState(false)
  const [archiveCategory, { isLoading }] = useArchiveMutation()

  return {
    hasSubcategories: (category?.subcategories?.length ?? 0) > 0,
    showSubcategories,
    isLoading: isLoading,
    toggleShowSubcategories: () => setShowSubcategories(show => !show),

    archiveCategory: async () => {
      try {
        await archiveCategory(category).unwrap()
      } catch (err) {
        console.error('Failed to archive category', err)
      }
    },

    updateCategory: async (id: string, category: CategoryEditableData) => {
      console.log('updating', { id, category })
    },
  }
}
