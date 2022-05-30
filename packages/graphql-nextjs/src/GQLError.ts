import type { GraphQLErrorRes } from './types';

class GQLError extends Error {
  response: GraphQLErrorRes;

  constructor(res: GraphQLErrorRes) {
    super('');
    Object.setPrototypeOf(this, GQLError.prototype);

    this.response = res;
  }
}

export default GQLError;
