import {
  ArchiveIcon,
  SquareMinusIcon,
  SquarePlusIcon,
} from '@/core/client/components'
import { useAppSelector } from '@/core/client/data'
import { useState } from 'react'
import { FullCategory } from '../../common'
import {
  selectCategoryById,
  useArchiveMutation,
} from '../data/categories-slice'

const useCategoryRow = (categoryId: string) => {
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

type CategoryRowProps = {
  categoryId: string
}
export const CategoryRow = ({ categoryId }: CategoryRowProps) => {
  const {
    showSubcategories,
    toggleShowSubcategories,
    category,
    archiveCategory,
  } = useCategoryRow(categoryId)

  if (!category) return null

  return (
    <>
      <MainCategory
        category={category}
        showingSubcategories={showSubcategories}
        onShowSubcategoriesToggleClick={toggleShowSubcategories}
        onArchiveCategoryClick={archiveCategory}
      />
      {showSubcategories &&
        category?.subcategories.map(c => (
          <tr key={c.id} className="border-b border-gray-200">
            <td className="p-2">
              <span className="ml-8">{c.name}</span>
            </td>
            <td className="p-2">
              <button
                className="cursor-pointer"
                onClick={() => archiveCategory(c)}
              >
                <ArchiveIcon color="gray" size={24} />
              </button>
            </td>
          </tr>
        ))}
    </>
  )
}

type MainCategory = {
  category: FullCategory
  showingSubcategories: boolean
  onShowSubcategoriesToggleClick: () => void
  onArchiveCategoryClick: (category: FullCategory) => void
}
const MainCategory = ({
  category,
  showingSubcategories,
  onShowSubcategoriesToggleClick,
  onArchiveCategoryClick,
}: MainCategory) => {
  const hasSubcategories = (category?.subcategories?.length ?? 0) > 0

  return (
    <tr className="border-b border-gray-200">
      <td className="flex items-center p-2">
        {hasSubcategories ? (
          <button
            className="mr-2 cursor-pointer"
            onClick={() => onShowSubcategoriesToggleClick()}
          >
            {showingSubcategories ? (
              <SquareMinusIcon color="gray" size={24} />
            ) : (
              <SquarePlusIcon color="gray" size={24} />
            )}
          </button>
        ) : (
          <div className="mr-8" />
        )}
        {category?.name}
      </td>
      <td className="p-2">
        <button
          className="cursor-pointer"
          onClick={() => onArchiveCategoryClick(category!)}
        >
          <ArchiveIcon color="gray" size={24} />
        </button>
      </td>
    </tr>
  )
}
