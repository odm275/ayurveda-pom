import { useEffect, useRef } from "react";
import { useApolloClient } from "@apollo/client";
import { Heading, Text, Box, Flex } from "@chakra-ui/react";
import { PageLayout } from "@/lib/components/PageLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { displaySuccessNotification } from "@/lib/utils/toast";

import {
  useLogInMutation,
  AuthUrlDocument,
  AuthUrlQuery,
  useAuthUrlQuery
} from "@/lib/generated";

import { useRouter } from "next/router";
import dayjs from "dayjs";
import { GenericLoadingScreen } from "@/lib/components/GenericLoadingScreen";
import { LogInGoogleButton } from "./components";
import { graphqlClient } from "@/apollo/graphql-request-client";

// Google token is going come back in the url. We can get our viewers info with that <-> LOG_IN mutation

export const LogInSection = () => {
  const client = useApolloClient();
  // const { setViewer, isAuthenticated, loading: loadingViewer } = useAuth();
  const { data, isLoading, error } = useAuthUrlQuery(graphqlClient);
  console.log("data", error);

  const router = useRouter();
  // const [logIn] = useLogInMutation({
  //   onCompleted: (data) => {
  //     if (data?.logIn?.token) {
  //       setViewer(data.logIn);
  //       sessionStorage.setItem("token", data.logIn.token);
  //     } else {
  //       sessionStorage.removeItem("token");
  //     }
  //     if (data && data.logIn) {
  //       router.replace(`user`);
  //       displaySuccessNotification(
  //         "You've succesfully logged in!",
  //         "Thank you"
  //       );
  //     }
  //   },
  //   onError: (e) => {
  //     console.log("error", e);
  //   }
  // });

  // const logInRef = useRef(logIn);

  const handleAuthorize = async () => {
    // const { data } = await client.query<AuthUrlQuery>({
    //   query: AuthUrlDocument
    // });
    window.location.href = data.authUrl;
  };

  // We wanna guarantee this runs on this client when window object is defined.
  // useEffect(() => {
  //   const code = new URL(window.location.href).searchParams.get("code");
  //   if (code) {
  //     logInRef.current({
  //       variables: {
  //         date: dayjs().format("MM-DD-YYYY"),
  //         today: dayjs().format("MM-DD-YYYY"),
  //         input: { code }
  //       }
  //     });
  //   }
  // }, []);

  // if (loadingViewer) {
  //   return <GenericLoadingScreen />;
  // }
  // if (isAuthenticated) {
  //   router.push("/user");
  //   return <GenericLoadingScreen />;
  // }

  return (
    <PageLayout>
      <Flex
        justify="center"
        align="center"
        flexGrow={1}
        flexDirection="column"
        width="100%"
        height="100%"
      >
        <Box
          width={{ base: "90%", md: "500px" }}
          textAlign="center"
          border="1px"
          borderColor="gray.200"
          p={{ base: 9, sm: 20 }}
        >
          <Text fontSize="4xl" mb="3">
            👋
          </Text>
          <Heading as="h3" size="xl" mb="2">
            Log in to Ayurveda
          </Heading>
          <Text>Sign in with Google to start booking available rentals</Text>
          <LogInGoogleButton onClick={handleAuthorize} />
          <Text>
            Note: By singing in, you&apos;ll be redirected to the Google consent
            form to sign in with your Google account.
          </Text>
        </Box>
      </Flex>
    </PageLayout>
  );
};
