import { gql } from '@apollo/client/core'

export const GET_EXPERIENCES = gql`
  query GetExperiences {
    experiences {
      slug
      company
      role
      description
      startDate
      endDate
      current
    }
  }
`