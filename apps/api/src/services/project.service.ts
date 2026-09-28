import { prisma } from "../lib/prisma.js";

const projectInclude = {
  technologies: {
    orderBy: { name: "asc" as const },
  },
};

export const projectService = {
  async getAll() {
    return prisma.project.findMany({
      include: projectInclude,
      orderBy: [
        { featured: "desc" },
        { startDate: "desc" },
        { createdAt: "desc" },
      ],
    });
  },

  async getFeatured() {
    return prisma.project.findMany({
      where: { featured: true },
      include: projectInclude,
      orderBy: [
        { startDate: "desc" },
        { createdAt: "desc" },
      ],
    });
  },

  async getBySlug(slug: string) {
    return prisma.project.findUnique({
      where: { slug },
      include: projectInclude,
    });
  },
};
