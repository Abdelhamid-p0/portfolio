export const typeDefs = `#graphql
  type Profile {
    id: ID!
    name: String!
    headline: String!
    bio: String!
    location: String
    avatarUrl: String
    email: String
    githubUrl: String
    linkedinUrl: String
  }

  type Technology {
    id: ID!
    name: String!
    slug: String!
    iconUrl: String
  }

  type Project {
    id: ID!
    title: String!
    slug: String!
    description: String!
    content: String
    imageUrl: String
    githubUrl: String
    liveUrl: String
    featured: Boolean!
    startDate: String
    endDate: String
    technologies: [Technology!]!
  }

  type Experience {
    id: ID!
    company: String!
    role: String!
    slug: String!
    description: String!
    startDate: String!
    endDate: String
    current: Boolean!
  }

  type Domain {
    id: ID!
    name: String!
    slug: String!
  }

  type Post {
    id: ID!
    title: String!
    slug: String!
    excerpt: String
    content: String!
    coverImageUrl: String
    published: Boolean!
    publishedAt: String
    createdAt: String!
    domains: [Domain!]!
  }

  type Query {
    profile: Profile

    projects: [Project!]!
    featuredProjects: [Project!]!
    project(slug: String!): Project

    experiences: [Experience!]!
    experience(slug: String!): Experience

    posts: [Post!]!
    post(slug: String!): Post
    postsByDomain(domainSlug: String!): [Post!]!

    technologies: [Technology!]!
    domains: [Domain!]!
  }
`;
