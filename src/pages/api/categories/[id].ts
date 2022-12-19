import type { NextApiResponse } from 'next'
import { Category } from '../../../features/category/models/category'
import { makeApi } from '../../../core/server/lib/api'
import { archive } from 'src/features/category/server/services/categories-service'

export default makeApi({
  delete: async (req, res: NextApiResponse<Category>) => {
    const categoryId = req.query.id as string
    const result = await archive(categoryId)
    res.status(200).json(result)
  },
})
