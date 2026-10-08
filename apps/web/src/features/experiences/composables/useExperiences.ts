import { useQuery } from '@vue/apollo-composable'

import type { ExperienceEntity } from '../../../entities/experience/types'
import { GET_EXPERIENCES } from '../graphql/experiences.query'

export type Experience = ExperienceEntity

export type ExperiencesQueryResult = {
  experiences: Experience[]
}

export function useExperiences() {
  return useQuery<ExperiencesQueryResult>(GET_EXPERIENCES)
}
