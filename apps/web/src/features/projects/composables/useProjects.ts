import { useQuery } from '@vue/apollo-composable'

import { GET_PROJECTS } from '../graphql/projects.query'

export type ProjectSummary = {
  slug: string
  title: string
  description?: string | null
  featured?: boolean | null
  technologies?: Array<{ name: string }> | null
}

export type ProjectsQueryResult = {
  projects: ProjectSummary[]
}

export function useProjects() {
  return useQuery<ProjectsQueryResult>(GET_PROJECTS)
}
