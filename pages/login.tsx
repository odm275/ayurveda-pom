import { useEffect, useRef, useContext } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { Heading, Text, Box, Flex, Button } from '@chakra-ui/react';
import { Layout } from '@/lib/components/Layout';
import { AppHeader } from '@/lib/components/AppHeader';
import { AUTH_URL } from '@/lib/graphql/queries';
import { LOG_IN } from '@/lib/graphql/mutations';
import { useAuth } from '@/lib/context/AuthContext';
import {
  displaySuccessNotification,
  displayErrorNotification
} from '@/lib/utils/index';

import {
  LogIn as LogInData,
  LogInVariables
} from '@/lib/graphql/mutations/LogIn/__generated__/LogIn';
import { AuthUrl as AuthUrlData } from '@/lib/graphql/queries/AuthUrl/__generated__/AuthUrl';

import { useRouter } from 'next/router';
import dayjs from 'dayjs';

// Google token is going come back in the url. We can get our viewers info with that <-> LOG_IN mutation

const Login = () => {
  const client = useApolloClient();
  const { setViewer } = useAuth();
  const router = useRouter();

  const handleAuthorize = async () => {
    const { data } = await client.query<AuthUrlData>({
      query: AUTH_URL
    });
    window.location.href = data.authUrl;
  };

  const [
    logIn,
    { data: logInData, loading: logInLoading, error: logInError }
  ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data?.logIn?.token) {
        setViewer(data.logIn);
        sessionStorage.setItem('token', data.logIn.token);
      } else {
        sessionStorage.removeItem('token');
      }
      if (data && data.logIn) {
        const { id: viewerId } = data.logIn;
        router.replace(`user/${viewerId}`);
        displaySuccessNotification(
          "You've succesfully logged in!",
          'Thank you'
        );
      }
    }
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    // If code from google is in the url -> try log in
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      logInRef.current({
        variables: {
          date: dayjs().format('MM-DD-YYYY'),
          input: { code }
        }
      });
    }
  }, []);

  return (
    <Layout>
      <Flex justify="center" align="center" flexGrow={1} flexDirection="column">
        <Box
          css={{ textAlign: 'center', width: '500px' }}
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
    </Layout>
  );
};

export default Login;
