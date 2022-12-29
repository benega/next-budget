import { Modal, useModal } from '@/core/client/components'
import React, { useState } from 'react'
import {
  AddCategory,
  CategoryEditModel,
  CategoryModel,
  UpdateCategory,
} from '../../common'
import { useAddCategoryMutation } from '../data/categories-slice'

type CategoryFormProps =
  | {
      mode: 'create'
      parentId?: string
      onCreate: (params: AddCategory.Params) => void
      onCancel: () => void
    }
  | {
      mode: 'edit'
      category: CategoryModel
      onUpdate: (params: UpdateCategory.Params) => void
      onCancel: () => void
    }

export const CategoryForm = (props: CategoryFormProps) => {
  const [data, setData] = useState<CategoryEditModel>(
    props.mode === 'edit' ? { name: props.category.name } : { name: '' }
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (props.mode === 'create') {
      props.onCreate({ ...data, parentId: props.parentId })
    } else {
      props.onUpdate({
        id: props.category.id,
        changes: {
          ...data,
        },
      })
    }
  }

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(data => ({
      ...data,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form
      className="flex flex-col items-start justify-between w-full max-w-md p-8 mb-4 bg-white rounded-md"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Category name"
        className="w-full p-2 border rounded-md"
        value={data?.name ?? ''}
        onChange={handleChanges}
      />
      <div className="flex justify-end w-full mt-8">
        <button className="mr-4" type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className="">Save</button>
      </div>
    </form>
  )
}

export const CreateCategoryFormModal = () => {
  const { modalProps, toggleModal } = useModal()
  const [addCategory] = useAddCategoryMutation()
  const handleCreate = async (data: CategoryEditModel) => {
    try {
      await addCategory(data).unwrap()
      toggleModal()
    } catch (e) {
      console.error('Error creating new category', { data, e })
    }
  }

  return (
    <>
      <button onClick={toggleModal} className="mb-4">
        New Category
      </button>
      <Modal {...modalProps}>
        <CategoryForm
          mode="create"
          onCreate={handleCreate}
          onCancel={toggleModal}
        />
      </Modal>
    </>
  )
}
