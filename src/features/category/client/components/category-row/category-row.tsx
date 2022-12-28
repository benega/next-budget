import {
  ArchiveIcon,
  EditIcon,
  IconButton,
  Loading,
  Modal,
  SquareMinusIcon,
  SquarePlusIcon,
  useModal,
} from '@/core/client/components'
import { useAppSelector } from '@/core/client/data'
import {
  CategoryEditableData,
  CategoryForm,
  CategoryFullModel,
  CategoryModel,
  selectCategoryById,
} from '@/features/category/client'
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
    isLoading,
  } = useCategoryRow(category)

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
        </td>
      </tr>
      {showSubcategories &&
        category?.subcategories.map(c => (
          <InternalCategoryRow key={c.id} category={c} />
        ))}
    </>
  )
}

export const EditCategoryButton = ({
  category,
  onUpdate,
}: {
  category: CategoryModel
  onUpdate: (id: string, category: CategoryEditableData) => void
}) => {
  const { modalProps, toggleModal } = useModal()

  return (
    <>
      <IconButton
        className="ml-2"
        onClick={() => toggleModal()}
        icon={<EditIcon color="gray" size={24} />}
      />
      <Modal {...modalProps}>
        <CategoryForm
          mode="edit"
          category={category}
          onUpdate={(id, category) => {
            onUpdate(id, category)
            toggleModal()
          }}
          onCancel={toggleModal}
        />
      </Modal>
    </>
  )
}
