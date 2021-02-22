import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

import { ProvideAuth } from '../lib/context/AuthContext';
import { useApollo } from '../apollo/client';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    if (window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <ProvideAuth>
          <Component {...pageProps} />
        </ProvideAuth>
      </ChakraProvider>
    </ApolloProvider>
  );
}
