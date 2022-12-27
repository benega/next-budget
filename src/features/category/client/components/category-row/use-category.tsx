import { useAppSelector } from '@/core/client/data'
import { useState } from 'react'
import { FullCategory, selectCategoryById, useArchiveMutation } from '../..'

export const useCategoryRow = (categoryId: string) => {
  const [showSubcategories, setShowSubcategories] = useState(false)
  const category = useAppSelector(state =>
    selectCategoryById(state, categoryId)
  )
  const [archiveCategory] = useArchiveMutation()

  const handleArchive = async (selectedCategory: FullCategory) => {
    if (!selectedCategory) return

    try {
      await archiveCategory(selectedCategory).unwrap()
    } catch (err) {
      console.error('Failed to archive category', err)
    }
  }

  return {
    showSubcategories,
    toggleShowSubcategories: () => setShowSubcategories(show => !show),
    category,
    archiveCategory: handleArchive,
  }
}
