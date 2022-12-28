import { makeApi } from '@/core/server/lib'
import {
  ArchiveCategory,
  UpdateCategory,
  archiveCategory,
  updateCategory,
} from '@/features/category/server'
import type { NextApiResponse } from 'next'

export default makeApi({
  delete: async (req, res: NextApiResponse<ArchiveCategory.Model>) => {
    const result = await archiveCategory(req.query.id as string)
    res.json(result)
  },
  patch: async (req, res: NextApiResponse<UpdateCategory.Model>) => {
    const result = await updateCategory({
      id: req.query.id as string,
      changes: req.body,
    })
    res.json(result)
  },
})
