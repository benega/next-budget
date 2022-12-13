import { Category } from '@prisma/client'
import type { NextApiResponse } from 'next'
import { makeApi } from '../../../server/lib/api'
import { fetchAll } from '../../../server/features'

export default makeApi({
  get: async (req, res: NextApiResponse<Category[]>) => {
    const categories = await fetchAll()
    res.status(200).json(categories)
  },
})
