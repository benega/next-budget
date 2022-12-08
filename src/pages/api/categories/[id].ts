import type { NextApiResponse } from 'next'
import { Category } from '../../../common/models/category'
import { makeApi } from '../../../server/app/api'
import { archive } from '../../../server/features/categories'

export default makeApi({
  delete: async (req, res: NextApiResponse<Category>) => {
    const categoryId = req.query.id as string
    const result = await archive(categoryId)
    res.status(200).json(result)
  },
})
