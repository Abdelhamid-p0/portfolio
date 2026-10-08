import { useQuery } from '@vue/apollo-composable'
import { toValue, type MaybeRefOrGetter } from 'vue'

import type { ProjectEntity } from '../../../entities/project/types'
import { GET_PROJECT } from '../graphql/projects.query'

export type ProjectQueryResult = {
  project: ProjectEntity | null
}

export function useProject(slug: MaybeRefOrGetter<string>) {
  return useQuery<ProjectQueryResult>(GET_PROJECT, () => ({ slug: toValue(slug) }))
}