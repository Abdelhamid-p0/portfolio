import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { seedProfile } from "./seed/profile.js";
import { seedTechnologies } from "./seed/technologies.js";
import { seedDomains } from "./seed/domains.js";
import { seedProjects } from "./seed/projects.js";
import { seedExperiences } from "./seed/experiences.js";
import { seedPosts } from "./seed/posts.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting portfolio seed...");

  const technologies = await seedTechnologies(prisma);
  console.log(`Seeded ${technologies.length} technologies`);

  const domains = await seedDomains(prisma);
  console.log(`Seeded ${domains.length} domains`);

  const profile = await seedProfile(prisma);
  console.log(`Seeded profile: ${profile.name}`);

  const projects = await seedProjects(prisma, technologies);
  console.log(`Seeded ${projects.length} projects`);

  const experiences = await seedExperiences(prisma);
  console.log(`Seeded ${experiences.length} experiences`);

  const posts = await seedPosts(prisma, domains);
  console.log(`Seeded ${posts.length} posts`);

  console.log("Portfolio seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Portfolio seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
