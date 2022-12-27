import {
  ArchiveIcon,
  EditIcon,
  SquareMinusIcon,
  SquarePlusIcon,
} from '@/core/client/components'
import { IconButton } from '@/core/client/components/ui/icon-button'
import { FullCategory } from '@/features/category/client'
import { useCategoryRow } from './use-category'

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
      <InternalCategoryRow
        category={category}
        showingSubcategories={showSubcategories}
        onShowSubcategoriesToggleClick={toggleShowSubcategories}
        onArchiveCategoryClick={archiveCategory}
      />
      {showSubcategories &&
        category?.subcategories.map(c => (
          <InternalCategoryRow
            key={c.id}
            category={c}
            onArchiveCategoryClick={archiveCategory}
            onShowSubcategoriesToggleClick={() => {}}
            showingSubcategories={true}
          />
        ))}
    </>
  )
}

type InternalCategoryRowProps = {
  category: FullCategory
  showingSubcategories: boolean
  onShowSubcategoriesToggleClick: () => void
  onArchiveCategoryClick: (category: FullCategory) => void
}
const InternalCategoryRow = ({
  category,
  showingSubcategories,
  onShowSubcategoriesToggleClick,
  onArchiveCategoryClick,
}: InternalCategoryRowProps) => {
  const hasSubcategories = (category?.subcategories?.length ?? 0) > 0

  const handleEditCategory = (category: FullCategory) => {
    console.log('edit category')
  }

  return (
    <tr className="border-b border-gray-200">
      <td className="flex items-center p-2">
        {hasSubcategories ? (
          <IconButton
            className="mr-2"
            icon={
              showingSubcategories ? (
                <SquareMinusIcon color="gray" size={24} />
              ) : (
                <SquarePlusIcon color="gray" size={24} />
              )
            }
            onClick={() => onShowSubcategoriesToggleClick()}
          />
        ) : (
          <div className="mr-8" />
        )}
        {category?.name}
      </td>
      <td className="p-2">
        <IconButton
          onClick={() => onArchiveCategoryClick(category!)}
          icon={<ArchiveIcon color="gray" size={24} />}
        />
        <IconButton
          className="ml-2"
          onClick={() => handleEditCategory(category!)}
          icon={<EditIcon color="gray" size={24} />}
        />
      </td>
    </tr>
  )
}
