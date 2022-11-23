import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { MdOutlineArchive } from 'react-icons/md'
import { Category } from '../../../common/models/category'
import { categoryArchived, fetchCategories } from './categories-slice'

export const CategoriesTable = () => {
  const dispatch = useAppDispatch()
  const { categories, status } = useAppSelector(state => state.categories)

  const handleArchive = (category: Category) => {
    dispatch(categoryArchived(category))
  }

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCategories())
  }, [status, dispatch])

  if (status === 'loading') return <p>Loading...</p>

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
              <td className="p-2">
                <button
                  className="cursor-pointer"
                  onClick={() => handleArchive(c)}
                >
                  <MdOutlineArchive color="gray" size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
