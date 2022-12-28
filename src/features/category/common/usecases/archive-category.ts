import { CategoryFullModel, CategoryModel } from '../models/category-model'

export namespace ArchiveCategory {
  export type Params = Pick<CategoryModel, 'id' | 'parentId'>

  export type Model = CategoryFullModel
}
