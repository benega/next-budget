import React from 'react'

export type Category = {
  id: string
  name: string
}

type Props = {
  categories: Category[]
}

export const CategoriesTable = ({ categories }: Props) => {
  return (
    <div className="overflow-x-auto self-start bg-slate-100 w-full text-left">
      <table className="w-full">
        <thead className="text-sm uppercase bg-gray-50">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2 w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {categories.map(c => (
            <tr key={c.id} className="border-b border-gray-200">
              <td className="p-2">{c.name}</td>
              <td className="p-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
