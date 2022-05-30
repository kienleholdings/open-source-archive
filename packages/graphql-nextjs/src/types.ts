import type { DocumentNode } from 'graphql';
import type { NextApiRequest, NextPageContext } from 'next';

// We're using partial types here so that we can pass potentially wrapped request objects (i.e.
// if the user is using withAuth from Clerk)
export type Context = { req: Partial<NextApiRequest> | Partial<NextPageContext['req']> };

export interface QueryOpts<Vars = unknown> {
  query: string | DocumentNode;
  variables?: Vars;
}

export interface GraphQLErrorRes {
  errors: [
    {
      message: string;
      locations?: { column: number; line: number };
      path?: string[];
    }
  ];
}
