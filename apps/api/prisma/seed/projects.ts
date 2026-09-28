import { PrismaClient } from "@prisma/client";

const projectsSeed = [
  {
    title: "AI Educational Platform",
    slug: "ai-educational-platform",
    description:
      "An AI-powered educational platform helping content managers review, improve and generate curriculum units with contextual grounding.",
    content:
      "# Context\n\nThe platform was designed to help content managers review and generate educational curriculum units with better contextual grounding.\n\n## Problem\nThe main challenge was to connect educational content with quality control, retrieval and generation workflows in a way that remained understandable for non-technical teams.\n\n## Approach\nWe built a modular architecture combining a React frontend, a Spring Boot backend, an AI orchestration layer and a retrieval layer on top of PostgreSQL with pgvector.\n\n## Technical decisions\nThe system relied on semantic retrieval, structured curriculum data and LLM-assisted generation to produce higher-quality educational content.\n\n## Challenges\nWe had to balance response quality, latency and explainability while keeping the platform maintainable.\n\n## Results\nThe solution made it easier to review, enrich and generate curriculum units with better contextual grounding.\n\n## Lessons learned\nA useful AI product needs strong domain constraints and clear data boundaries, not just model access.",
    imageUrl: null,
    githubUrl: null,
    liveUrl: null,
    featured: true,
    startDate: new Date("2025-01-01T00:00:00.000Z"),
    endDate: null,
    technologies: [
      "react",
      "typescript",
      "spring-boot",
      "java-21",
      "postgresql",
      "pgvector",
      "docker",
    ],
  },
  {
    title: "Kafka Consumer Optimization",
    slug: "kafka-consumer-optimization",
    description:
      "A production-focused proof of concept for improving invoice-processing reliability and Kafka consumer throughput.",
    content:
      "# Context\n\nThe project focused on improving the reliability of invoice processing and the behavior of Kafka consumers in a production-like environment.\n\n## Problem\nConsumer lag, throughput instability and operational noise were creating reliability concerns around event processing.\n\n## Approach\nWe analyzed the consumer pipeline, reduced unnecessary work in the message flow and tuned batch behavior to improve throughput.\n\n## Technical decisions\nThe solution reused Kafka consumer groups, PostgreSQL persistence and monitoring to better understand bottlenecks and operational behavior.\n\n## Challenges\nThe hardest part was making sure the optimization stayed safe for real workloads and did not hide deeper processing issues.\n\n## Lessons learned\nSmall changes in batching, lag visibility and operational monitoring often matter more than a single large optimization.",
    imageUrl: null,
    githubUrl: null,
    liveUrl: null,
    featured: true,
    startDate: new Date("2025-01-01T00:00:00.000Z"),
    endDate: null,
    technologies: [
      "java-21",
      "apache-kafka",
      "postgresql",
      "docker",
      "prometheus",
      "debezium",
    ],
  },
  {
    title: "ENSAK EVENT — Campus Platform",
    slug: "ensak-event-campus-platform",
    description:
      "Campus event management platform with event lifecycle management, QR ticket validation and access control.",
    content:
      "# Context\n\nThe platform was built for campus event operations, covering event lifecycle management and access validation.\n\n## Problem\nThe team needed a clear flow for event publication, attendance tracking and access control in a simple but reliable platform.\n\n## Approach\nWe used Spring Boot on the backend and Angular on the frontend, with PostgreSQL and Redis as the main infrastructure pieces.\n\n## Technical decisions\nThe design focused on a reusable event workflow, secure authentication and practical operational tooling for campus staff.\n\n## Lessons learned\nGood event management systems need to be simple enough for staff to use daily while still supporting operational safety.",
    imageUrl: null,
    githubUrl: null,
    liveUrl: null,
    featured: false,
    startDate: new Date("2024-01-01T00:00:00.000Z"),
    endDate: new Date("2024-12-31T00:00:00.000Z"),
    technologies: [
      "spring-boot",
      "angular",
      "postgresql",
      "redis",
      "jwt",
      "tailwind-css",
    ],
  },
  {
    title: "JobInsight — AI Career Engine",
    slug: "jobinsight-ai-career-engine",
    description:
      "Semantic search and resume alignment platform using embeddings to match candidate profiles with job descriptions.",
    content:
      "# Context\n\nThe platform focused on matching candidate profiles with job descriptions using meaningful semantic similarity rather than simple keyword search.\n\n## Problem\nThe challenge was to make search and ranking more useful for recruiters and candidates without building a brittle rule system.\n\n## Approach\nWe used a Python and FastAPI backend, a React front end and embeddings powered by Qdrant and OpenAI embeddings.\n\n## Technical decisions\nSemantic search and ranking were treated as a retrieval problem, with embeddings stored and queried in a vector database.\n\n## Lessons learned\nQuality matching comes more from retrieval design and document preparation than from the model alone.",
    imageUrl: null,
    githubUrl: null,
    liveUrl: null,
    featured: false,
    startDate: new Date("2024-01-01T00:00:00.000Z"),
    endDate: new Date("2024-12-31T00:00:00.000Z"),
    technologies: [
      "python",
      "fastapi",
      "react",
      "openai-embeddings",
      "qdrant",
      "docker",
    ],
  },
] as const;

export async function seedProjects(prisma: PrismaClient, technologies: Awaited<ReturnType<typeof prisma.technology.findMany>>) {
  const technologyMap = new Map(technologies.map((technology) => [technology.slug, technology]));

  const results = [] as Awaited<ReturnType<typeof prisma.project.upsert>>[];

  for (const project of projectsSeed) {
    const projectTechnologies = Array.from(
      new Set(project.technologies),
    )
      .map((slug) => technologyMap.get(slug))
      .filter(Boolean) as typeof technologies;

    const item = await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        description: project.description,
        content: project.content,
        imageUrl: project.imageUrl,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        featured: project.featured,
        startDate: project.startDate,
        endDate: project.endDate,
        technologies: {
          set: projectTechnologies.map((technology) => ({ id: technology.id })),
        },
      },
      create: {
        title: project.title,
        slug: project.slug,
        description: project.description,
        content: project.content,
        imageUrl: project.imageUrl,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        featured: project.featured,
        startDate: project.startDate,
        endDate: project.endDate,
        technologies: {
          connect: projectTechnologies.map((technology) => ({ id: technology.id })),
        },
      },
    });

    results.push(item);
  }

  return results;
}
