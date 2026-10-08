import type { DomainEntity } from '../domain/types'

export type PostEntity = {
  id: string
  slug: string
  title: string
  excerpt?: string | null
  content?: string | null
  coverImageUrl?: string | null
  published: boolean
  publishedAt?: string | null
  createdAt: string
  domains: DomainEntity[]
}
