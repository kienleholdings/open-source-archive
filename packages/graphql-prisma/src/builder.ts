import type SchemaBuilder from '@pothos/core/dts/builder';
import type { PrismaClient } from '@prisma/client';

export type PrismaBuilder<T> = { PrismaTypes: T };
export const genPrismaBuilderConfig = (
  client: PrismaClient
): { prisma: { client: PrismaClient } } => ({
  prisma: {
    client,
  },
});

// We're allowing any here to allow devs to use any valid Pothos type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initBuilder = (builder: SchemaBuilder<any>) => {
  builder.queryType({});
  builder.mutationType({});
};
