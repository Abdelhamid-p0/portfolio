import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const GET_POSTS = gql`
  query GetPosts {
    posts {
      slug
      title
      excerpt
      publishedAt
      domains {
        slug
        name
      }
    }
  }
`

export type Post = {
  slug: string
  title: string
  excerpt?: string | null
  publishedAt?: string | null
  domains?: Array<{ slug: string; name: string }> | null
}

export type PostsQueryResult = {
  posts: Post[]
}

export function usePosts() {
  return useQuery<PostsQueryResult>(GET_POSTS)
}
