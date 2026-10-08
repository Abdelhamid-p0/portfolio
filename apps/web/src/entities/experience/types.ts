export type ExperienceEntity = {
  slug: string
  company: string
  role: string
  description: string
  startDate: string
  endDate?: string | null
  current: boolean
}
