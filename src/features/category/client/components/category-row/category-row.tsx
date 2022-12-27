import {
  ArchiveIcon,
  EditIcon,
  SquareMinusIcon,
  SquarePlusIcon,
} from '@/core/client/components'
import { IconButton } from '@/core/client/components/ui/icon-button'
import { useAppSelector } from '@/core/client/data'
import { FullCategory, selectCategoryById } from '@/features/category/client'
import { useCategoryRow } from './use-category'

type CategoryRowProps = {
  categoryId: string
}
export const CategoryRow = ({ categoryId }: CategoryRowProps) => {
  const category = useAppSelector(state =>
    selectCategoryById(state, categoryId)
  )
  if (!category) return null

  return <InternalCategoryRow category={category} />
}

type InternalCategoryRowProps = {
  category: FullCategory
}
const InternalCategoryRow = ({ category }: InternalCategoryRowProps) => {
  const {
    hasSubcategories,
    showSubcategories,
    toggleShowSubcategories,
    archiveCategory,
  } = useCategoryRow(category)

  const handleEditCategory = (category: FullCategory) => {
    console.log('edit category', category.name)
  }

  return (
    <>
      <tr className="border-b border-gray-200">
        <td className="flex items-center p-2">
          {hasSubcategories ? (
            <IconButton
              className="mr-2"
              icon={
                showSubcategories ? (
                  <SquareMinusIcon color="gray" size={24} />
                ) : (
                  <SquarePlusIcon color="gray" size={24} />
                )
              }
              onClick={toggleShowSubcategories}
            />
          ) : (
            <div className="mr-8" />
          )}
          {category?.name}
        </td>
        <td className="p-2">
          <IconButton
            onClick={() => archiveCategory(category!)}
            icon={<ArchiveIcon color="gray" size={24} />}
          />
          <IconButton
            className="ml-2"
            onClick={() => handleEditCategory(category!)}
            icon={<EditIcon color="gray" size={24} />}
          />
        </td>
      </tr>
      {showSubcategories &&
        category?.subcategories.map(c => (
          <InternalCategoryRow key={c.id} category={c} />
        ))}
    </>
  )
}
