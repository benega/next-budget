import {
  ArchiveIcon,
  IconButton,
  Loading,
  SquareMinusIcon,
  SquarePlusIcon,
} from '@/core/client/components'
import { useAppSelector } from '@/core/client/data'
import {
  CategoryFullModel,
  selectCategoryById,
} from '@/features/category/client'
import {
  AddSubCategoryButton,
  EditCategoryButton,
} from './category-row-actions'
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
  category: CategoryFullModel
}
const InternalCategoryRow = ({ category }: InternalCategoryRowProps) => {
  const {
    hasSubcategories,
    showSubcategories,
    toggleShowSubcategories,
    archiveCategory,
    updateCategory,
    addCategory,
    isLoading,
  } = useCategoryRow(category)

  const canAddSubCategory = !category.parentId

  return (
    <>
      <tr className="border-b border-gray-200">
        <td className="flex items-center p-2">
          {isLoading && <Loading />}
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
            onClick={archiveCategory}
            icon={<ArchiveIcon color="gray" size={24} />}
          />
          <EditCategoryButton category={category} onUpdate={updateCategory} />
          {canAddSubCategory && (
            <AddSubCategoryButton category={category} onAdd={addCategory} />
          )}
        </td>
      </tr>
      {showSubcategories &&
        category?.subcategories.map(c => (
          <InternalCategoryRow key={c.id} category={c} />
        ))}
    </>
  )
}
