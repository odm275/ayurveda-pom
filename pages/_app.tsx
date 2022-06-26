import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";

import { ProvideAuth } from "../lib/context";
import { apolloClient2 } from "../apollo/apollo";
import { LoadingSpinner } from "@/lib/components/LoadingSpinner";

import "../styles/styles.css";
import "../styles/chart.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const toast = createStandaloneToast();

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const id = "react-query-error";
  const title =
    error instanceof Error ? error.message : "error connecting to server";

  // prevent duplicate toasts
  toast.closeAll();
  toast({ id, title, status: "error", variant: "subtle", isClosable: true });
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            onError: queryErrorHandler,
            staleTime: 600000, // 10 mimutes
            cacheTime: 900000, // 15 minutes (doesn't make sense for staletime to exceed cachetime),
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
          },
          mutations: {
            onError: queryErrorHandler
          }
        }
      })
  );

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
          <LoadingSpinner />
          <Component {...pageProps} />
          {/* </ProvideAuth> */}
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ApolloProvider>
  );
}
