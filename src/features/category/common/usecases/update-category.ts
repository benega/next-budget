import { CategoryEditModel, CategoryFullModel } from '../models/category-model'

export namespace UpdateCategory {
  export type InputModel = CategoryEditModel

  export type Params = {
    id: string
    changes: InputModel
  }

  export type Model = CategoryFullModel
}
