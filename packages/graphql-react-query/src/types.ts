import type { DocumentNode } from 'graphql';

export interface GraphQLErrorRes {
  errors: [
    {
      message: string;
      locations?: { column: number; line: number };
      path?: string[];
    }
  ];
}

export type Query = DocumentNode | string;
