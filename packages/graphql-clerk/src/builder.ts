export type DefaultAuthSchema = {
  authenticated: boolean;
};

export type ClerkContext = {
  req: {
    auth?: {
      userId: string;
    };
  };
};

export type ClerkBuilder<T = DefaultAuthSchema> = {
  AuthScopes: T;
  Context: ClerkContext;
};
