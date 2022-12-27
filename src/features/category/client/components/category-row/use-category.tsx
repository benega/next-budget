import { useState } from 'react'
import { FullCategory, useArchiveMutation } from '../..'

export const useCategoryRow = (category: FullCategory) => {
  const [showSubcategories, setShowSubcategories] = useState(false)
  const [archiveCategory, { isLoading }] = useArchiveMutation()

  const handleArchive = async () => {
    try {
      await archiveCategory(category).unwrap()
    } catch (err) {
      console.error('Failed to archive category', err)
    }
  }

  return {
    hasSubcategories: (category?.subcategories?.length ?? 0) > 0,
    showSubcategories,
    toggleShowSubcategories: () => setShowSubcategories(show => !show),
    archiveCategory: handleArchive,
    isLoading: isLoading,
  }
}
