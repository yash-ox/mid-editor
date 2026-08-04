import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

// Prefer Prisma Accelerate when available. For a direct DB connection,
// install and use the appropriate driver adapter (e.g. `@prisma/adapter-pg`).
// Example for PostgreSQL (if you switch to Postgres):
// import { PrismaPg } from "@prisma/adapter-pg";
// const adapter = new PrismaPg({ url: process.env.DATABASE_URL! });
// export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });

const prismaOptions: any = {};
if (process.env.PRISMA_ACCELERATE_URL) {
  prismaOptions.accelerateUrl = process.env.PRISMA_ACCELERATE_URL;
}

export const db = globalForPrisma.prisma ?? new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
