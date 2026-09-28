import { prisma } from "../lib/prisma.js";

export const profileService = {
  async getProfile() {
    return prisma.profile.findFirst({
      orderBy: { createdAt: "asc" },
    });
  },
};
