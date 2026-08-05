import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

const prismaOptions: any = {};
if (process.env.PRISMA_ACCELERATE_URL) {
  prismaOptions.accelerateUrl = process.env.PRISMA_ACCELERATE_URL;
}

export const db = globalForPrisma.prisma ?? new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
