import React from 'react'
import { Category } from '../../../common/models/category'
import { v4 as uuidv4 } from 'uuid'
import { useAppSelector } from '../../app/hooks'

// const categories: Category[] = [
//   { id: uuidv4(), name: 'Home' },
//   { id: uuidv4(), name: 'Car' },
//   { id: uuidv4(), name: 'Food' },
//   { id: uuidv4(), name: 'Personal' },
//   { id: uuidv4(), name: 'Subscriptions' },
//   { id: uuidv4(), name: 'Charity' },
//   { id: uuidv4(), name: 'Gifts' },
//   { id: uuidv4(), name: 'Others' },
// ]

export const CategoriesTable = () => {
  const { categories } = useAppSelector(state => state.categories)

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
