import { useAppSelector } from '../../app/hooks'
import {
  getCategoriesError,
  getCategoriesStatus,
  selectCategoriesIds,
} from './categories-slice'
import { CategoryRow } from './category-row'

export const CategoriesTable = () => {
  const status = useAppSelector(getCategoriesStatus)
  const error = useAppSelector(getCategoriesError)
  const categoriesIds = useAppSelector(selectCategoriesIds)

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>{error}</p>

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
          {categoriesIds.map(c => (
            <CategoryRow key={c.toString()} categoryId={c.toString()} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
