import { useQuery } from '@vue/apollo-composable'
import type { ProjectEntity } from '../../../entities/project/types'

import { GET_FEATURED_PROJECTS, GET_PROJECTS } from '../graphql/projects.query'

export type ProjectSummary = ProjectEntity

export type ProjectsQueryResult = {
  projects: ProjectSummary[]
}

export type FeaturedProjectsQueryResult = {
  featuredProjects: ProjectSummary[]
}

export function useProjects() {
  return useQuery<ProjectsQueryResult>(GET_PROJECTS)
}

export function useFeaturedProjects() {
  return useQuery<FeaturedProjectsQueryResult>(GET_FEATURED_PROJECTS)
}
