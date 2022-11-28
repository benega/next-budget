import { Category } from '@prisma/client'
import { MdOutlineArchive } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { categoryArchived, selectCategoryById } from './categories-slice'

type CategoryRowProps = {
  categoryId: string
}
export const CategoryRow = ({ categoryId }: CategoryRowProps) => {
  const dispatch = useAppDispatch()

  const category = useAppSelector(state =>
    selectCategoryById(state, categoryId)
  )

  const handleArchive = (category: Category) => {
    dispatch(categoryArchived(category))
  }

  // if (!category)
  //   return (
  //     <tr className="border-b border-gray-200">
  //       <td className="p-2"></td>
  //       <td className="p-2"></td>
  //     </tr>
  //   )

  return (
    <tr className="border-b border-gray-200">
      <td className="p-2">{category?.name}</td>
      <td className="p-2">
        <button
          className="cursor-pointer"
          onClick={() => handleArchive(category!)}
        >
          <MdOutlineArchive color="gray" size={24} />
        </button>
      </td>
    </tr>
  )
}
