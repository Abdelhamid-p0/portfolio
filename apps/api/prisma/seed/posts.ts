import { PrismaClient } from "@prisma/client";

const postsSeed = [
  {
    title: "Building a RAG system with Spring Boot, PostgreSQL and pgvector",
    slug: "building-rag-system-spring-boot-postgresql-pgvector",
    excerpt:
      "Why pgvector can be a practical choice when vector search needs to stay close to an existing relational database.",
    content: "# Introduction\n\nA retrieval-augmented generation system can become valuable when it keeps data close to the systems that already manage your trusted business information.\n\n## Context\nThe challenge is not only vector search itself, but also how it fits with existing relational data models and application responsibilities.\n\n## Problem\nIf your backend already uses PostgreSQL for transactional data, it is often easier to keep the vector search layer close to that context instead of introducing a second, disconnected system too early.\n\n## Approach\nThe design combines a Spring Boot application, structured metadata storage in PostgreSQL and pgvector for semantic retrieval. This keeps document search close to the existing data model while making the retrieval step more relevant for AI workflows.\n\n## Technical decisions\nThe main choice was to keep retrieval logic understandable and operationally simple, avoiding unnecessary complexity in the data flow.\n\n## What worked\nA practical setup around embeddings and structured metadata made it easier to ground responses in relevant context.\n\n## What did not work\nIt is easy to overestimate vector search alone without paying attention to data quality and retrieval boundaries.\n\n## Lessons learned\nThe real value comes from the combination of good data preparation, clear retrieval logic and disciplined system design.\n\n## Conclusion\nFor many applications, pgvector is a pragmatic option when you need a simple path to semantic retrieval without abandoning your relational foundation.",
    coverImageUrl: null,
    published: true,
    publishedAt: new Date("2025-01-01T00:00:00.000Z"),
    domains: ["generative-ai", "rag", "backend", "software-architecture"],
  },
  {
    title: "Optimizing a Kafka Consumer: what actually made the difference?",
    slug: "optimizing-kafka-consumer",
    excerpt:
      "Profiling consumer behavior, batch processing and Kafka configuration to understand what actually affects throughput and latency.",
    content: "# Introduction\n\nKafka consumer optimization is rarely a single magic fix. In practice, the biggest wins usually come from understanding the actual bottlenecks and adjusting the system around them.\n\n## Context\nIn event-driven systems, processing time can be stuck behind lag, difficult batch behavior or poor operational visibility.\n\n## Problem\nIt is common for a consumer pipeline to look healthy on paper while still struggling under real-world load or uneven event patterns.\n\n## Approach\nThe work focused on profiling consumer behavior, reviewing batch logic and understanding how configuration changes affected throughput and latency.\n\n## Technical decisions\nWe reduced unnecessary work in the flow and improved the visibility of lag and processing patterns.\n\n## What worked\nBetter observability made the real bottlenecks much more obvious, and targeted tuning had a measurable effect on reliability.\n\n## What did not work\nSome assumptions about a single tuning parameter were wrong once the workload shape changed.\n\n## Lessons learned\nThe biggest performance gains usually come from understanding the system rather than chasing a single configuration flag.\n\n## Conclusion\nKafka optimization is a systems problem more than a configuration exercise, and reliability is often the more important target than raw speed.",
    coverImageUrl: null,
    published: true,
    publishedAt: new Date("2024-11-01T00:00:00.000Z"),
    domains: ["backend", "distributed-systems", "event-driven-systems", "experiments"],
  },
  {
    title: "From CRUD to AI: structuring an AI-powered Spring Boot application",
    slug: "from-crud-to-ai-spring-boot",
    excerpt:
      "Exploring how to structure prompt handling, embeddings and AI integrations inside a modular Spring Boot application.",
    content: "# Introduction\n\nMoving from a traditional CRUD backend to an AI-enabled application changes the architecture in ways that go beyond adding a model call.\n\n## Context\nThe challenge is to introduce AI in a way that stays maintainable and predictable inside a domain-driven backend.\n\n## Problem\nWithout clear boundaries, prompt logic, retrieval logic and orchestration code tend to spread across the application and become harder to reason about.\n\n## Approach\nThe solution separated the application into clearer layers: domain logic, AI orchestration, retrieval and API boundaries.\n\n## Technical decisions\nThe approach focused on modularity, testable orchestration and explicit contracts between the application and the model layer.\n\n## What worked\nA clear application structure reduced the cognitive overhead and made it easier to evolve the AI integration safely.\n\n## Lessons learned\nAI features should feel like a first-class backend capability, not a loose collection of model calls.\n\n## Conclusion\nWhen the system is structured well, adding AI becomes a software design problem rather than just a prompt engineering problem.",
    coverImageUrl: null,
    published: true,
    publishedAt: new Date("2024-09-01T00:00:00.000Z"),
    domains: ["backend", "generative-ai", "software-architecture"],
  },
  {
    title: "What I learned from using Spec-Driven Development",
    slug: "lessons-spec-driven-development",
    excerpt:
      "What I learned from using explicit specifications and API contracts to reduce integration drift between frontend and backend.",
    content: "# Introduction\n\nSpec-driven development helped me think more carefully about contracts before implementation, especially on cross-team work.\n\n## Context\nWhen frontend and backend evolve separately, integration drift often appears late and becomes expensive to fix.\n\n## Problem\nA vague or implicit contract creates ambiguity, duplicated assumptions and slower iteration.\n\n## Approach\nThe project used clear specifications and shared expectations to reduce ambiguity before implementation details were written.\n\n## Technical decisions\nThe focus was on explicit interfaces, contract clarity and better collaboration between teams.\n\n## What worked\nIt reduced confusion and helped the team converge on the same interpretation earlier.\n\n## What did not work\nSpecifications still need regular review, otherwise they can become outdated without anyone noticing.\n\n## Lessons learned\nThe value of specification-driven work is not only in the document itself, but in the shared understanding it creates.\n\n## Conclusion\nClear contracts are a practical way to improve software quality without overengineering the process.",
    coverImageUrl: null,
    published: true,
    publishedAt: new Date("2024-07-01T00:00:00.000Z"),
    domains: ["experiments", "developer-tooling", "software-architecture"],
  },
  {
    title: "Lessons from building an educational GenAI platform",
    slug: "lessons-building-educational-genai-platform",
    excerpt:
      "Lessons from integrating generative AI into an educational application, especially around reliability, evaluation and contextual grounding.",
    content: "# Introduction\n\nEducational AI systems are compelling, but they are also highly sensitive to trust, clarity and grounding quality.\n\n## Context\nA platform built for educational content needs more than a clever prompt; it needs a reliable process for contextual grounding and review.\n\n## Problem\nWithout strong boundaries, generative features can produce content that looks convincing while still being weak or insufficiently grounded.\n\n## Approach\nThe work centered on a retrieval and review workflow that supported content managers and kept a clear structure around generation.\n\n## Technical decisions\nWe gave priority to retrieval quality, evaluation of outputs and clear limits around what the system should and should not generate.\n\n## What worked\nA grounded workflow improved trust and made the AI features more useful in real educational scenarios.\n\n## Lessons learned\nEvaluation and grounded context matter as much as the model itself.\n\n## Conclusion\nThe most useful AI systems are not the ones that appear most impressive at first glance, but the ones that remain reliable and understandable in real work.",
    coverImageUrl: null,
    published: true,
    publishedAt: new Date("2024-05-01T00:00:00.000Z"),
    domains: ["generative-ai", "rag", "experiments"],
  },
] as const;

export async function seedPosts(prisma: PrismaClient, domains: Awaited<ReturnType<typeof prisma.domain.findMany>>) {
  const domainMap = new Map(domains.map((domain) => [domain.slug, domain]));

  const results = [] as Awaited<ReturnType<typeof prisma.post.upsert>>[];

  for (const post of postsSeed) {
    const postDomains = Array.from(new Set(post.domains))
      .map((slug) => domainMap.get(slug))
      .filter(Boolean) as typeof domains;

    const item = await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImageUrl: post.coverImageUrl,
        published: post.published,
        publishedAt: post.publishedAt,
        domains: {
          set: postDomains.map((domain) => ({ id: domain.id })),
        },
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImageUrl: post.coverImageUrl,
        published: post.published,
        publishedAt: post.publishedAt,
        domains: {
          connect: postDomains.map((domain) => ({ id: domain.id })),
        },
      },
    });

    results.push(item);
  }

  return results;
}
