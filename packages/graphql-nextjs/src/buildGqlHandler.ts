import type { GraphQLSchema } from 'graphql';
import {
  getGraphQLParameters,
  processRequest,
  sendResult,
  shouldRenderGraphiQL,
  renderGraphiQL,
} from 'graphql-helix';
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import type { Context } from './types';

const buildGqlHandler = (
  schema: GraphQLSchema,
  allowGraphiql = false
  // eslint-disable-next-line arrow-body-style
): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const request = {
      body: req.body,
      headers: req.headers,
      method: req.method || '',
      query: req.query,
    };

    if (allowGraphiql && shouldRenderGraphiQL(request)) {
      res.send(
        renderGraphiQL({
          endpoint: '/api/graphql',
        })
      );
    } else {
      const { operationName, query, variables } = getGraphQLParameters(request);

      const result = await processRequest<Context>({
        contextFactory: () => ({
          req,
        }),
        operationName,
        query,
        request,
        schema,
        variables,
      });

      sendResult(result, res);
    }
  };
};

export default buildGqlHandler;
