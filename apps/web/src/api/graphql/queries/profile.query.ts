import { gql } from '@apollo/client/core'

export type Profile = {
  id: string
  name: string
  headline?: string | null
  location?: string | null
}

export type ProfileQueryResult = {
  profile: Profile | null
}

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      name
      headline
      location
    }
  }
`
