import type SchemaBuilder from '@pothos/core/dts/builder';
// @ts-expect-error: PrismaClient sometimes doesn't get generated in CI, remove this in your local build if this causes errors
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
