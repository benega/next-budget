import { makeApi } from '@/core/server/lib'
import {
  AddCategory,
  FetchCategories,
  addCategory,
  fetchCategories,
} from '@/features/category/server'
import type { NextApiRequest, NextApiResponse } from 'next'

export default makeApi({
  get: async (req, res: NextApiResponse<FetchCategories.Model[]>) => {
    try {
      const categories = await fetchCategories()
      res.json(categories)
    } catch (e) {
      console.error('error at GET categories', e)
      res.status(500)
    }
  },
  post: async (
    req: NextApiRequest,
    res: NextApiResponse<AddCategory.Model>
  ) => {
    const category = await addCategory(req.body as AddCategory.Params)
    res.json(category)
  },
})
