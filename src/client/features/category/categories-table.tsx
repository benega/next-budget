import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchCategories, selectAllCategories } from './categories-slice'
import { CategoryRow } from './category-row'

export const CategoriesTable = () => {
  const dispatch = useAppDispatch()
  const { categories, status } = useAppSelector(selectAllCategories)

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
            <CategoryRow key={c.id} categoryId={c.id} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
