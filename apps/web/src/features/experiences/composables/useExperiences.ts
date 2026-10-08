import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const GET_EXPERIENCES = gql`
  query GetExperiences {
    experiences {
      slug
      company
      role
      startDate
      endDate
    }
  }
`

export type Experience = {
  slug: string
  company: string
  role: string
  startDate?: string | null
  endDate?: string | null
}

export type ExperiencesQueryResult = {
  experiences: Experience[]
}

export function useExperiences() {
  return useQuery<ExperiencesQueryResult>(GET_EXPERIENCES)
}
