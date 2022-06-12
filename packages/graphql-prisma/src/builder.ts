import type SchemaBuilder from '@pothos/core/dts/builder';

export type PrismaBuilder<T> = { PrismaTypes: T };
export const genPrismaBuilderConfig = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): { prisma: { client: any } } => ({
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
