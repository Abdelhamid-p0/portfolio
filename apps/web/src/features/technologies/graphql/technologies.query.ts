import { gql } from '@apollo/client/core'

export const GET_TECHNOLOGIES = gql`
  query GetTechnologies {
    technologies {
      id
      name
      slug
      iconUrl
    }
  }
`