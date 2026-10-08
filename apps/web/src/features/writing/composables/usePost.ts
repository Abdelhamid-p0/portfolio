import { useQuery } from '@vue/apollo-composable'
import { toValue, type MaybeRefOrGetter } from 'vue'

import type { PostEntity } from '../../../entities/post/types'
import { GET_POST } from '../graphql/posts.query'

export type PostQueryResult = {
  post: PostEntity | null
}

export function usePost(slug: MaybeRefOrGetter<string>) {
  return useQuery<PostQueryResult>(GET_POST, () => ({ slug: toValue(slug) }))
}