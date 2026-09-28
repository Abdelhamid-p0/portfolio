import { PrismaClient } from "@prisma/client";

export async function seedProfile(prisma: PrismaClient) {
  const profileData = {
    name: "Abdelhamid Hachimi-Alaoui",
    headline: "Software Engineer",
    bio: "Je suis ingénieur logiciel, intéressé par la conception de systèmes logiciels fiables, les applications Full-Stack et l'intégration pratique de l'IA générative. J'aime comprendre les problèmes techniques, construire des solutions simples et maintenables, expérimenter et documenter ce que j'apprends.",
    location: "Rabat, Morocco",
    avatarUrl: null,
    email: null,
    githubUrl: null,
    linkedinUrl: null,
  };

  const existingProfile = await prisma.profile.findFirst();

  if (existingProfile) {
    return prisma.profile.update({
      where: { id: existingProfile.id },
      data: profileData,
    });
  }

  return prisma.profile.create({
    data: profileData,
  });
}
