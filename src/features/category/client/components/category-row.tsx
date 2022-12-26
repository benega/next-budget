import { useAppSelector } from '@/core/client/data'
import { useState } from 'react'
import { MdOutlineArchive } from 'react-icons/md'
import { TbSquareMinus, TbSquarePlus } from 'react-icons/tb'
import { FullCategory } from '../../common'
import {
  selectCategoryById,
  useArchiveMutation,
} from '../data/categories-slice'

type CategoryRowProps = {
  categoryId: string
}
export const CategoryRow = ({ categoryId }: CategoryRowProps) => {
  const [showSubcategories, setShowSubcategories] = useState(false)
  const category = useAppSelector(state =>
    selectCategoryById(state, categoryId)
  )
  const [archiveCategory] = useArchiveMutation()

  if (!category) return null

  const handleArchive = async (selectedCategory: FullCategory) => {
    if (!selectedCategory) return

    try {
      await archiveCategory(selectedCategory).unwrap()
    } catch (err) {
      console.error('Failed to archive category', err)
    }
  }

  const handleShowSubcategories = () => {
    setShowSubcategories(show => !show)
  }

  return (
    <>
      <MainCategory
        category={category}
        showingSubcategories={showSubcategories}
        onShowSubcategoriesToggleClick={handleShowSubcategories}
        onArchiveCategoryClick={handleArchive}
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
                onClick={() => handleArchive(c)}
              >
                <MdOutlineArchive color="gray" size={24} />
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
              <TbSquareMinus color="gray" size={24} />
            ) : (
              <TbSquarePlus color="gray" size={24} />
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
          <MdOutlineArchive color="gray" size={24} />
        </button>
      </td>
    </tr>
  )
}
