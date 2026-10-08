import { useQuery } from '@vue/apollo-composable'

import { GET_FEATURED_PROJECTS } from '../graphql/projects.query'

export type ProjectSummary = {
  id: string
  slug: string
  title: string
  description: string
  content?: string | null
  imageUrl?: string | null
  githubUrl?: string | null
  liveUrl?: string | null
  featured?: boolean | null
  startDate?: string | null
  endDate?: string | null
  technologies?: Array<{ name: string; slug: string }> | null
}

export type ProjectsQueryResult = {
  featuredProjects: ProjectSummary[]
}

export function useProjects() {
  return useQuery<ProjectsQueryResult>(GET_FEATURED_PROJECTS)
}
