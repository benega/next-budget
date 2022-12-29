import {
  AddIcon,
  ButtonModal,
  EditIcon,
  IconButton,
} from '@/core/client/components'
import {
  AddCategory,
  CategoryForm,
  CategoryModel,
  UpdateCategory,
} from '@/features/category/client'

type EditCategoryButtonProps = {
  category: CategoryModel
  onUpdate: (params: UpdateCategory.Params) => void
}
export const EditCategoryButton = ({
  category,
  onUpdate,
}: EditCategoryButtonProps) => {
  return (
    <ButtonModal
      button={toggleModal => (
        <IconButton
          className="ml-2"
          onClick={() => toggleModal()}
          icon={<EditIcon color="gray" size={24} />}
        />
      )}
      body={toggleModal => (
        <CategoryForm
          mode="edit"
          category={category}
          onUpdate={params => {
            onUpdate(params)
            toggleModal()
          }}
          onCancel={toggleModal}
        />
      )}
    />
  )
}

type AddSubCategoryButtonProps = {
  category: CategoryModel
  onAdd: (params: AddCategory.Params) => void
}
export const AddSubCategoryButton = ({
  category,
  onAdd,
}: AddSubCategoryButtonProps) => {
  return (
    <ButtonModal
      button={toggleModal => (
        <IconButton
          className="ml-2"
          onClick={() => toggleModal()}
          icon={<AddIcon color="gray" size={24} />}
        />
      )}
      body={toggleModal => (
        <CategoryForm
          mode="create"
          parentId={category.id}
          onCreate={params => {
            onAdd(params)
            toggleModal()
          }}
          onCancel={toggleModal}
        />
      )}
    />
  )
}
