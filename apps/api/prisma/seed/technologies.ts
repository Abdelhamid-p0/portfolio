import { PrismaClient } from "@prisma/client";

const technologiesSeed = [
  { name: "Java", slug: "java" },
  { name: "Java 21", slug: "java-21" },
  { name: "Spring Boot", slug: "spring-boot" },
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Python", slug: "python" },
  { name: "React", slug: "react" },
  { name: "Angular", slug: "angular" },
  { name: "Vue.js", slug: "vue-js" },
  { name: "Node.js", slug: "node-js" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "pgvector", slug: "pgvector" },
  { name: "Apache Kafka", slug: "apache-kafka" },
  { name: "Debezium", slug: "debezium" },
  { name: "Redis", slug: "redis" },
  { name: "Docker", slug: "docker" },
  { name: "Docker Compose", slug: "docker-compose" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "Qdrant", slug: "qdrant" },
  { name: "OpenAI Embeddings", slug: "openai-embeddings" },
  { name: "GraphQL", slug: "graphql" },
  { name: "Prisma", slug: "prisma" },
  { name: "Git", slug: "git" },
  { name: "GitHub Actions", slug: "github-actions" },
  { name: "Tailwind CSS", slug: "tailwind-css" },
  { name: "Prometheus", slug: "prometheus" },
  { name: "JWT", slug: "jwt" },
] as const;

export async function seedTechnologies(prisma: PrismaClient) {
  const results = [] as Awaited<ReturnType<typeof prisma.technology.upsert>>[];

  for (const tech of technologiesSeed) {
    const item = await prisma.technology.upsert({
      where: { slug: tech.slug },
      update: {
        name: tech.name,
      },
      create: {
        name: tech.name,
        slug: tech.slug,
      },
    });

    results.push(item);
  }

  return results;
}
