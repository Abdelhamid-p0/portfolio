import { prisma } from "../lib/prisma.js";

const postInclude = {
  domains: {
    orderBy: { name: "asc" as const },
  },
};

export const postService = {
  async getAllPublished() {
    return prisma.post.findMany({
      where: { published: true },
      include: postInclude,
      orderBy: [
        { publishedAt: "desc" },
        { createdAt: "desc" },
      ],
    });
  },

  async getBySlug(slug: string) {
    return prisma.post.findFirst({
      where: {
        slug,
        published: true,
      },
      include: postInclude,
    });
  },

  async getByDomain(domainSlug: string) {
    return prisma.post.findMany({
      where: {
        published: true,
        domains: {
          some: {
            slug: domainSlug,
          },
        },
      },
      include: postInclude,
      orderBy: [
        { publishedAt: "desc" },
        { createdAt: "desc" },
      ],
    });
  },
};
