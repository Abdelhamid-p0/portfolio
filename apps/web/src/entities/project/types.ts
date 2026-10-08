export type ProjectEntity = {
  slug: string
  title: string
  description?: string | null
  featured?: boolean | null
  technologies?: Array<{ name: string }> | null
}
