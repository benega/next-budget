import type { NextApiRequest, NextApiResponse } from 'next'

type CustomData = { [key: string]: any }

export type CustomNextApiRequest = NextApiRequest & {
  custom: CustomData
}

export type Endpoint = (req: NextApiRequest, res: NextApiResponse<any>) => void

export type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type ApiHandler = {
  [key in Methods]?: Endpoint
}

export const makeApi = (handler: ApiHandler) => {
  return async (req: CustomNextApiRequest, res: NextApiResponse) => {
    req.custom = req.custom || {}

    const method = req.method?.toLowerCase() as Methods

    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`)

    return handler[method]!(req, res)
  }
}
