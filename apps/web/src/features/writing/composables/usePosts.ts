import { useQuery } from '@vue/apollo-composable'

import type { PostEntity } from '../../../entities/post/types'
import { GET_POSTS } from '../graphql/posts.query'

export type PostsQueryResult = {
  posts: PostEntity[]
}

export function usePosts() {
  return useQuery<PostsQueryResult>(GET_POSTS)
}