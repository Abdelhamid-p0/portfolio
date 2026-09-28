import { PrismaClient } from "@prisma/client";

const domainsSeed = [
  { name: "Generative AI", slug: "generative-ai" },
  { name: "RAG", slug: "rag" },
  { name: "Backend", slug: "backend" },
  { name: "Software Architecture", slug: "software-architecture" },
  { name: "Distributed Systems", slug: "distributed-systems" },
  { name: "Event-Driven Systems", slug: "event-driven-systems" },
  { name: "DevOps", slug: "devops" },
  { name: "Experiments", slug: "experiments" },
  { name: "Full-Stack", slug: "full-stack" },
  { name: "Developer Tooling", slug: "developer-tooling" },
] as const;

export async function seedDomains(prisma: PrismaClient) {
  const results = [] as Awaited<ReturnType<typeof prisma.domain.upsert>>[];

  for (const domain of domainsSeed) {
    const item = await prisma.domain.upsert({
      where: { slug: domain.slug },
      update: {
        name: domain.name,
      },
      create: {
        name: domain.name,
        slug: domain.slug,
      },
    });

    results.push(item);
  }

  return results;
}
