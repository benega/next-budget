import { makeApi } from '@/server/lib/api'
import { Category } from '@prisma/client'
import type { NextApiResponse } from 'next'
import { fetchAll } from 'src/features/category/server/services/categories-service'

export default makeApi({
  get: async (req, res: NextApiResponse<Category[]>) => {
    const categories = await fetchAll()
    res.status(200).json(categories)
  },
})
