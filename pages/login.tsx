import { useEffect, useRef } from "react";
import { useApolloClient } from "@apollo/client";
import { Heading, Text, Box, Flex, Button } from "@chakra-ui/react";
import { PageLayout } from "@/lib/components/PageLayout";
import { useAuth } from "@/lib/context/AuthContext";
import {
  displaySuccessNotification,
  displayErrorNotification
} from "@/lib/utils/toast";

import {
  useLogInMutation,
  AuthUrlDocument,
  AuthUrlQuery
} from "@/lib/generated";

import { useRouter } from "next/router";
import dayjs from "dayjs";
import { Navbar } from "@/lib/components/Navbar";
import { GenericLoadingScreen } from "../lib/components";

// Google token is going come back in the url. We can get our viewers info with that <-> LOG_IN mutation

const Login = () => {
  const client = useApolloClient();
  const { loading, setViewer, isAuthenticated } = useAuth();
  const router = useRouter();
  const [logIn, { loading: manualLoginLoading }] = useLogInMutation({
    onCompleted: (data) => {
      if (data?.logIn?.token) {
        setViewer(data.logIn);
        sessionStorage.setItem("token", data.logIn.token);
      } else {
        sessionStorage.removeItem("token");
      }
      if (data && data.logIn) {
        router.replace(`user`);
        displaySuccessNotification(
          "You've succesfully logged in!",
          "Thank you"
        );
      }
    }
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    // If code from google is in the url -> try log in
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      logInRef.current({
        variables: {
          date: dayjs().format("MM-DD-YYYY"),
          input: { code }
        }
      });
    }
  }, []);

  const handleAuthorize = async () => {
    const { data } = await client.query<AuthUrlQuery>({
      query: AuthUrlDocument
    });
    window.location.href = data.authUrl;
  };

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/user");
    }
  }, [isAuthenticated, loading]);

  if (loading || isAuthenticated || manualLoginLoading) {
    return <GenericLoadingScreen />;
  }

  return (
    <PageLayout>
      <Flex justify="center" align="center" flexGrow={1} flexDirection="column">
        <Box
          css={{ textAlign: "center", width: "500px" }}
          border="1px"
          borderColor="gray.200"
          p="20"
        >
          <Text fontSize="4xl" mb="3">
            👋
          </Text>
          <Heading as="h3" size="xl" isTruncated mb="2">
            Log in to Ayurveda
          </Heading>
          <Text>Sign in with Google to start booking available rentals</Text>
          <Button my="10">
            <img
              src="/google_logo.jpg"
              alt="Google Logo"
              style={{ height: 43 }}
            />
            <Text onClick={handleAuthorize}>Sign in with Google</Text>
          </Button>
          <Text>
            Note: By singing in, you'll be redirected to the Google consent form
            to sign in with your Google account.
          </Text>
        </Box>
      </Flex>
    </PageLayout>
  );
};

export default Login;
