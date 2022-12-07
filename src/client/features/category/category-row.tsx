import { useState } from 'react'
import { MdOutlineArchive } from 'react-icons/md'
import { TbSquarePlus, TbSquareMinus } from 'react-icons/tb'
import { Category } from '../../../common/models/category'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { categoryArchived, selectCategoryById } from './categories-slice'

type CategoryRowProps = {
  categoryId: string
}
export const CategoryRow = ({ categoryId }: CategoryRowProps) => {
  const [showSubcategories, setShowSubcategories] = useState(false)
  const dispatch = useAppDispatch()
  const category = useAppSelector(state =>
    selectCategoryById(state, categoryId)
  )

  if (!category) return undefined

  const handleArchive = (category: Category) => {
    if (category) dispatch(categoryArchived(category))
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
  category: Category
  showingSubcategories: boolean
  onShowSubcategoriesToggleClick: () => void
  onArchiveCategoryClick: (category: Category) => void
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
      <td className="p-2 flex items-center">
        {hasSubcategories ? (
          <button
            className="cursor-pointer mr-2"
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
