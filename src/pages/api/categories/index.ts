import { makeApi } from '@/core/server/lib'
import {
  AddCategory,
  FullCategory,
  create,
  fetchAll,
} from '@/features/category/server'
import type { NextApiRequest, NextApiResponse } from 'next'

export default makeApi({
  get: async (req, res: NextApiResponse<FullCategory[]>) => {
    const categories = await fetchAll()
    res.status(200).json(categories)
  },
  post: async (req: NextApiRequest, res: NextApiResponse<FullCategory>) => {
    const category = await create(req.body as AddCategory)
    console.log('created new category', category)
    res.status(201).json(category)
  },
})
