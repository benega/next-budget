import { useAppSelector } from '@/client/data'
import { useEffect, useState } from 'react'
import {
  getCategoriesError,
  getCategoriesStatus,
  selectCategoriesIds,
} from '../data/categories-slice'
import { CategoryRow } from './category-row'

export const CategoriesTable = () => {
  const status = useAppSelector(getCategoriesStatus)
  const error = useAppSelector(getCategoriesError)
  const categoriesIds = useAppSelector(selectCategoriesIds)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(status === 'loading')
  }, [status])

  if (isLoading) return <p>Loading...</p>
  if (status === 'failed') return <p>{error}</p>

  return (
    <div className="self-start w-full overflow-x-auto text-left bg-slate-100">
      <table className="w-full">
        <thead className="text-sm uppercase bg-gray-50">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2 w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {categoriesIds.map(c => (
            <CategoryRow key={c.toString()} categoryId={c.toString()} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
