import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let apolloClient;

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'X-CSRF-TOKEN': token || ''
    }
  };
});

function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema');
    const { schema } = require('./schema');
    return new SchemaLink({ schema });
  } else {
    const { HttpLink } = require('@apollo/client/link/http');
    const newhttpLink = new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin'
    });
    const link = authLink.concat(newhttpLink);
    return link;
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache()
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
