import { prisma } from "../lib/prisma.js";

export const technologyService = {
  async getAll() {
    return prisma.technology.findMany({
      orderBy: { name: "asc" },
    });
  },
};
