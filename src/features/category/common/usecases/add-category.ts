import { CategoryEditModel, CategoryModel } from '../models/category-model'

export namespace AddCategory {
  export type Params = CategoryEditModel &
    Partial<Pick<CategoryModel, 'parentId'>>

  export type Model = CategoryModel
}
