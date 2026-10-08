import type { TechnologyEntity } from '../technology/types'

export type ProjectEntity = {
  id: string
  slug: string
  title: string
  description: string
  content?: string | null
  imageUrl?: string | null
  githubUrl?: string | null
  liveUrl?: string | null
  featured: boolean
  startDate?: string | null
  endDate?: string | null
  technologies: TechnologyEntity[]
}
