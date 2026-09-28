import { prisma } from "../lib/prisma.js";

export const experienceService = {
  async getAll() {
    return prisma.experience.findMany({
      orderBy: [
        { current: "desc" },
        { startDate: "desc" },
        { createdAt: "desc" },
      ],
    });
  },

  async getBySlug(slug: string) {
    return prisma.experience.findUnique({
      where: { slug },
    });
  },
};
