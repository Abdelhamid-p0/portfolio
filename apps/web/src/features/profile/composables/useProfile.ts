import { useQuery } from '@vue/apollo-composable'

import { GET_PROFILE } from '../graphql/profile.query'

export type ProfileData = {
  profile: {
    id: string
    name: string
    headline?: string | null
    bio?: string | null
    location?: string | null
    email?: string | null
    githubUrl?: string | null
    linkedinUrl?: string | null
  } | null
}

export function useProfile() {
  return useQuery<ProfileData>(GET_PROFILE)
}
