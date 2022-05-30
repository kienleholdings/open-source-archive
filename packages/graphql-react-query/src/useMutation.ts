import { GraphQLClient } from 'graphql-request';
import type { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQueryClient } from 'react-query';

import type { GraphQLErrorRes, Query } from './types';
import { formatError } from './utils';

const useWrappedMutation = <Res = unknown, Vars = unknown>(
  endpoint: string,
  reqOptions: RequestInit,
  queryName: string,
  query: Query,
  queriesToInvalidate?: string[]
) => {
  const queryClient = useQueryClient();
  const client = new GraphQLClient(endpoint, reqOptions);
  const { error, ...res } = useMutation<Res, GraphQLErrorRes['errors'], Vars>(
    queryName,
    async (variables) => client.request<Res, Vars>(query, variables),
    {
      onSuccess: () => {
        if (queriesToInvalidate) {
          queryClient.invalidateQueries(queriesToInvalidate);
        }
      },
    }
  );
  return {
    ...res,
    error: formatError(error),
  };
};

export default useWrappedMutation;
