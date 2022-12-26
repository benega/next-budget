import { Modal, useModal } from '@/core/client/components'
import React, { useState } from 'react'
import { FullCategory } from '../../common'
import { useAddNewCategoryMutation } from '../data/categories-slice'

const emptyCategory: FullCategory = {
  id: '',
  name: '',
  createdAt: new Date(),
  parentId: null,
  subcategories: [],
  updatedAt: new Date(),
  archived: false,
}

type Props = {
  onSave: () => void
  onCancel: () => void
}

export const CategoryForm = ({ onSave, onCancel }: Props) => {
  const [addCategory] = useAddNewCategoryMutation()

  const [category, setCategory] = useState<FullCategory>(emptyCategory)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addCategory({
      name: category.name,
      parentId: null,
    })
    setCategory({ ...emptyCategory })
    onSave()
  }

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(category => ({
      ...category,
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
        value={category.name}
        onChange={handleChanges}
      />
      <div className="flex justify-end w-full mt-8">
        <button className="mr-4" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="">Save</button>
      </div>
    </form>
  )
}

export const CategoryFormModal = () => {
  const { modalProps, toggleModal } = useModal()

  return (
    <>
      <button onClick={toggleModal} className="mb-4">
        New Category
      </button>
      <Modal {...modalProps}>
        <CategoryForm onSave={toggleModal} onCancel={toggleModal} />
      </Modal>
    </>
  )
}
