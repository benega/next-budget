import { CategoryFullModel } from '@/features/category/common'
import { EntityState } from '@reduxjs/toolkit'

export const createTagsFromEntityState = <TTag extends string>(
  type: TTag,
  mainId?: string | null,
  result?: EntityState<CategoryFullModel>
): { type: TTag; id: string }[] => {
  return [
    ...(mainId ? [{ type, id: mainId }] : []),
    ...(result?.ids.map(id => ({ type, id: id.toString() })) ?? []),
  ]
}

export const createTags = <TTag extends string>(
  type: TTag,
  ...ids: (string | undefined | null)[]
): { type: TTag; id: string }[] => {
  return ids.filter(id => !!id).map(id => ({ type, id: id ?? '' }))
}
