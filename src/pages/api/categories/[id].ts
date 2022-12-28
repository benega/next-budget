import { makeApi } from '@/core/server/lib'
import { CategoryFullModel, archive } from '@/features/category/server'
import type { NextApiResponse } from 'next'

export default makeApi({
  delete: async (req, res: NextApiResponse<CategoryFullModel>) => {
    const categoryId = req.query.id as string
    const result = await archive(categoryId)
    res.status(200).json(result)
  },
})
