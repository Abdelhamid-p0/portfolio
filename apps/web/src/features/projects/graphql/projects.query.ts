import { gql } from '@apollo/client/core'

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      slug
      title
      description
      featured
      technologies {
        name
      }
    }
  }
`
