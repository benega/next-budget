import { CategoryFullModel, CategoryModel } from '../models/category-model'

export namespace UpdateCategory {
  export type Params = Pick<CategoryModel, 'id' | 'name'>

  export type Model = CategoryFullModel
}
