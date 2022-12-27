import { Loading } from '@/core/client/components'
import { useAppSelector } from '@/core/client/data'
import {
  selectCatagoryIds,
  useGetCategoriesQuery,
} from '../data/categories-slice'
import { CategoryRow } from './category-row'

export const CategoriesTable = () => {
  const { isLoading, isError, error } = useGetCategoriesQuery()
  const categoriesIds = useAppSelector(selectCatagoryIds)

  if (isLoading) return <Loading />

  if (isError) {
    console.error('Error fetching categories', error)
    return <p>Error fetching categories..</p>
  }

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
