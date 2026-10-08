import { gql } from '@apollo/client/core'

const postFields = `
  id
  title
  slug
  excerpt
  coverImageUrl
  published
  publishedAt
  createdAt
  domains {
    id
    name
    slug
  }
`

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      ${postFields}
    }
  }
`

export const GET_POST = gql`
  query GetPost($slug: String!) {
    post(slug: $slug) {
      ${postFields}
      content
    }
  }
`