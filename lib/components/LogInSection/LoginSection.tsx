import { useEffect } from "react";
import Router from "next/router";
import { Heading, Text, Box, Flex } from "@chakra-ui/react";
import { PageLayout } from "@/lib/components/PageLayout";
import { useAuth, useUser } from "@/lib/hooks";
import { useAuthUrlQuery } from "@/lib/generated";
import { LogInGoogleButton } from "./components";
import { graphqlClient } from "@/apollo/graphql-request-client";
import { GenericLoadingScreen } from "../GenericLoadingScreen";

export const LogInSection = () => {
  const { login } = useAuth();
  const { user } = useUser();
  const { data = null } = useAuthUrlQuery(graphqlClient);

  const handleAuthorize = () => {
    window.location.href = data.authUrl;
  };

  // We want to run in client because of window object.
  useEffect(() => {
    // With google token -> Login
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      login();
    }
  }, []);

  if (user) {
    Router.replace("/user");
  }

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
          <LogInGoogleButton onClick={handleAuthorize} disabled={!data} />
          <Text>
            Note: By singing in, you&apos;ll be redirected to the Google consent
            form to sign in with your Google account.
          </Text>
        </Box>
      </Flex>
    </PageLayout>
  );
};
