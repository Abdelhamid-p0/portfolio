import { domainService } from "../services/domain.service.js";
import { experienceService } from "../services/experience.service.js";
import { postService } from "../services/post.service.js";
import { profileService } from "../services/profile.service.js";
import { projectService } from "../services/project.service.js";
import { technologyService } from "../services/technology.service.js";

const serializeDate = (value: Date | string | null | undefined) => {
  if (!value) {
    return null;
  }

  return new Date(value).toISOString();
};

export const resolvers = {
  Query: {
    profile: () => profileService.getProfile(),

    projects: () => projectService.getAll(),
    featuredProjects: () => projectService.getFeatured(),
    project: (_root: unknown, { slug }: { slug: string }) => projectService.getBySlug(slug),

    experiences: () => experienceService.getAll(),
    experience: (_root: unknown, { slug }: { slug: string }) => experienceService.getBySlug(slug),

    posts: () => postService.getAllPublished(),
    post: (_root: unknown, { slug }: { slug: string }) => postService.getBySlug(slug),
    postsByDomain: (_root: unknown, { domainSlug }: { domainSlug: string }) => postService.getByDomain(domainSlug),

    technologies: () => technologyService.getAll(),
    domains: () => domainService.getAll(),
  },

  Project: {
    startDate: (parent: { startDate: Date | string | null | undefined }) => serializeDate(parent.startDate),
    endDate: (parent: { endDate: Date | string | null | undefined }) => serializeDate(parent.endDate),
  },

  Experience: {
    startDate: (parent: { startDate: Date | string }) => serializeDate(parent.startDate),
    endDate: (parent: { endDate: Date | string | null | undefined }) => serializeDate(parent.endDate),
  },

  Post: {
    createdAt: (parent: { createdAt: Date | string }) => serializeDate(parent.createdAt),
    publishedAt: (parent: { publishedAt: Date | string | null | undefined }) => serializeDate(parent.publishedAt),
  },
};
