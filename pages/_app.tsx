import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import { ProvideAuth } from "../lib/context";
import { apolloClient2 } from "../apollo/apollo";

import "../styles/styles.css";
import "../styles/chart.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient2}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          {/* <ProvideAuth> */}
          <Component {...pageProps} />
          {/* </ProvideAuth> */}
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ApolloProvider>
  );
}
