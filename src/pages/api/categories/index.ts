import { makeApi } from '@/server/lib/api'
import { Category } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { AddCategory, FullCategory } from 'src/features/category/models'
import {
  fetchAll,
  create,
} from 'src/features/category/server/services/categories-service'

export default makeApi({
  get: async (req, res: NextApiResponse<Category[]>) => {
    const categories = await fetchAll()
    res.status(200).json(categories)
  },
  post: async (req: NextApiRequest, res: NextApiResponse<FullCategory>) => {
    const category = await create(req.body as AddCategory)
    console.log('created new category', category)
    res.status(201).json(category)
  },
})
