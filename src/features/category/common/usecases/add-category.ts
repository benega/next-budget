import { CategoryModel } from '../models/category-model'

export namespace AddCategory {
  export type Params = Pick<CategoryModel, 'name'>

  export type Model = CategoryModel
}
