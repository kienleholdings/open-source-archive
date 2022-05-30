import { GraphQLClient } from 'graphql-request';
import type { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery } from 'react-query';

import type { GraphQLErrorRes, Query } from './types';
import { formatError } from './utils';

const useWrappedQuery = <Res = unknown, Vars = unknown>(
  endpoint: string,
  reqOptions: RequestInit,
  queryName: string,
  query: Query,
  variables?: Vars
) => {
  const client = new GraphQLClient(endpoint, reqOptions);
  const { error, ...res } = useQuery<Res, GraphQLErrorRes['errors']>(queryName, async () =>
    client.request<Res, Vars>(query, variables)
  );
  return {
    ...res,
    error: formatError(error),
  };
};

export default useWrappedQuery;
