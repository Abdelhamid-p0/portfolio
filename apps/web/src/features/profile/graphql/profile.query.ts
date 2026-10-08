import { gql } from '@apollo/client/core'

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      name
      headline
      bio
      location
      avatarUrl
      email
      githubUrl
      linkedinUrl
    }
  }
`
