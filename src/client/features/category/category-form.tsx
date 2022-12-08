import React, { useRef, useState } from 'react'
import { Category } from '../../../common/models/category'
import { useAppDispatch } from '../../app/hooks'
import { categoryAdded } from './categories-slice'

const emptyCategory: Category = {
  id: '',
  name: '',
  createdAt: new Date(),
  parentId: null,
  subcategories: [],
  updatedAt: new Date(),
  archived: false,
}

type Props = {}

export const CategoryForm = (props: Props) => {
  const dispatch = useAppDispatch()

  const [category, setCategory] = useState<Category>(emptyCategory)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(categoryAdded(category))
    setCategory({ ...emptyCategory })
  }

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(category => ({
      ...category,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form
      className="mb-4 w-full flex flex-col items-start justify-between max-w-md bg-white p-8 rounded-md"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Category name"
        className="p-2 rounded-md w-full border"
        value={category.name}
        onChange={handleChanges}
      />
      <button className="self-end mt-8">Save</button>
    </form>
  )
}
