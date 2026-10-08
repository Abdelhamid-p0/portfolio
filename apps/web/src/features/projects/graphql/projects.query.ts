import { gql } from '@apollo/client/core'

export const GET_FEATURED_PROJECTS = gql`
  query GetFeaturedProjects {
    featuredProjects {
      id
      slug
      title
      description
      content
      imageUrl
      githubUrl
      liveUrl
      featured
      startDate
      endDate
      technologies {
        name
        slug
      }
    }
  }
`
