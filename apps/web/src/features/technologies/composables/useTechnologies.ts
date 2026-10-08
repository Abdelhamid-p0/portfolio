import { useQuery } from '@vue/apollo-composable'

import type { TechnologyEntity } from '../../../entities/technology/types'
import { GET_TECHNOLOGIES } from '../graphql/technologies.query'

export type TechnologiesQueryResult = {
  technologies: TechnologyEntity[]
}

export function useTechnologies() {
  return useQuery<TechnologiesQueryResult>(GET_TECHNOLOGIES)
}