import { processRequest } from 'graphql-helix';
import type { ProcessRequestOptions } from 'graphql-helix';
import type { NextPageContext } from 'next';

import GQLError from './GQLError';
import type { Context, GraphQLErrorRes, QueryOpts } from './types';

type Opts = ProcessRequestOptions<Context, object>;

const fetchSSRQuery = async <Res = unknown, Vars = unknown>(
  queryOpts: QueryOpts<Vars>,
  serverOpts: {
    ctx: Partial<NextPageContext>;
    schema: Opts['schema'];
  }
) => {
  const { query, variables } = queryOpts;
  const { ctx, schema } = serverOpts;
  const result = await processRequest<Context>({
    contextFactory: () => ({
      req: ctx.req,
    }),
    query,
    request: { ...ctx.req, query: ctx.query, method: 'POST', headers: ctx.req?.headers || {} },
    schema,
    variables,
  });

  // No idea why, but graphql-helix doesn't give us the payload type despite the fact that it
  // exists, so we have to cast this as a custom type
  const { payload } = result as unknown as {
    payload: { data: Res; errors: GraphQLErrorRes['errors'] };
  };

  if (payload.errors) {
    throw new GQLError(payload);
  }

  return payload.data;
};

export default fetchSSRQuery;
