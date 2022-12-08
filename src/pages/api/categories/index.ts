import { Category } from '@prisma/client'
import type { NextApiResponse } from 'next'
import { makeApi } from '../../../server/app/api'
import { fetchAll } from '../../../server/features/categories'

export default makeApi({
  get: async (req, res: NextApiResponse<Category[]>) => {
    const categories = await fetchAll()
    res.status(200).json(categories)
  },
})
