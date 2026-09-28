import { prisma } from "../lib/prisma.js";

export const domainService = {
  async getAll() {
    return prisma.domain.findMany({
      orderBy: { name: "asc" },
    });
  },

  async getBySlug(slug: string) {
    return prisma.domain.findUnique({
      where: { slug },
    });
  },
};
