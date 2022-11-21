import React from 'react'

type Props = {}

export const CategoryForm = (props: Props) => {
  return (
    <form className="mb-4 w-full flex flex-col items-start justify-between max-w-md bg-white p-8 rounded-md">
      <input
        type="text"
        placeholder="Category name"
        className="p-2 rounded-md w-full border"
      />
      <button className="self-end mt-8">Save</button>
    </form>
  )
}
