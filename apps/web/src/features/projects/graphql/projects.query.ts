import { gql } from '@apollo/client/core'

const projectFields = gql`
  fragment ProjectFields on Project {
    id
    slug
    title
    description
    imageUrl
    githubUrl
    liveUrl
    featured
    startDate
    endDate
    technologies {
      id
      name
      slug
      iconUrl
    }
  }
`

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      ...ProjectFields
    }
  }
  ${projectFields}
`

export const GET_FEATURED_PROJECTS = gql`
  query GetFeaturedProjects {
    featuredProjects {
      ...ProjectFields
    }
  }
  ${projectFields}
`

export const GET_PROJECT = gql`
  query GetProject($slug: String!) {
    project(slug: $slug) {
      ...ProjectFields
      content
    }
  }
  ${projectFields}
`
