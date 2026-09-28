import { PrismaClient } from "@prisma/client";

const experiencesSeed = [
  {
    company: "Cegedim",
    role: "Software Engineering Intern",
    slug: "cegedim-software-engineering-intern",
    description:
      "Production-focused work around invoice and medical claim stream processing using Apache Kafka and event-driven pipelines. I analyzed consumer lag bottlenecks, optimized Kafka processing, worked around Debezium CDC and PostgreSQL integrations, and contributed to improving the reliability of message processing workflows.",
    startDate: new Date("2025-01-01T00:00:00.000Z"),
    endDate: new Date("2025-06-30T00:00:00.000Z"),
    current: false,
  },
  {
    company: "TNA Consulting",
    role: "Full-Stack Developer Intern",
    slug: "tna-consulting-full-stack-developer-intern",
    description:
      "Angular enterprise client platform development focused on reusable component engineering and frontend refactoring. I collaborated on TypeScript frontend work, reusable UI components, REST API integration and testing across the application stack.",
    startDate: new Date("2024-01-01T00:00:00.000Z"),
    endDate: new Date("2024-12-31T00:00:00.000Z"),
    current: false,
  },
] as const;

export async function seedExperiences(prisma: PrismaClient) {
  const results = [] as Awaited<ReturnType<typeof prisma.experience.upsert>>[];

  for (const experience of experiencesSeed) {
    const item = await prisma.experience.upsert({
      where: { slug: experience.slug },
      update: {
        company: experience.company,
        role: experience.role,
        description: experience.description,
        startDate: experience.startDate,
        endDate: experience.endDate,
        current: experience.current,
      },
      create: {
        company: experience.company,
        role: experience.role,
        slug: experience.slug,
        description: experience.description,
        startDate: experience.startDate,
        endDate: experience.endDate,
        current: experience.current,
      },
    });

    results.push(item);
  }

  return results;
}
