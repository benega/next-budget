import { EntityState } from '@reduxjs/toolkit'
import { Category } from 'src/features/category/models'

export const createTagsFromEntityState = <TTag extends string>(
  type: TTag,
  mainId?: string | null,
  result?: EntityState<Category>
): { type: TTag; id: string }[] => {
  return [
    ...(mainId ? [{ type, id: mainId }] : []),
    ...(result?.ids.map(id => ({ type, id: id.toString() })) ?? []),
  ]
}

export const createTags = <TTag extends string>(
  type: TTag,
  ...ids: string[]
): { type: TTag; id: string }[] => {
  return ids.map(id => ({ type, id }))
}
