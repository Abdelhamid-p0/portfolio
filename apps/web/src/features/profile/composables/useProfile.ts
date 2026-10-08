import { useQuery } from '@vue/apollo-composable'

import type { ProfileEntity } from '../../../entities/profile/types'
import { GET_PROFILE } from '../graphql/profile.query'

export type ProfileData = {
  profile: ProfileEntity | null
}

export function useProfile() {
  return useQuery<ProfileData>(GET_PROFILE)
}
