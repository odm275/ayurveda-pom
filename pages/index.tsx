import { useRef } from 'react';
import { Flex, Button, Spinner, useDisclosure } from '@chakra-ui/react';
import PomodoroTimer from '@/lib/components/PomodoroTimer';
import AppHeaderSkeleton from '@/lib/components/AppHeaderSkeleton';
import ErrorBanner from '@/lib/components/ErrorBanner';
import { Layout } from '@/lib/components/Layout';
import { useAuth } from '@/lib/context/AuthContext';
import { TasksDrawer } from '@/lib/components/TasksDrawer';

const Index = () => {
  const { viewer, error } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  // User is loading
  if (!viewer.didRequest && !error) {
    return (
      <Flex flexDir="column" p={3}>
        <AppHeaderSkeleton />
        <Flex justifyContent="center">
          <Spinner
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </Flex>
    );
  }

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We aren't able to verify if you were logged in. Please try again later!" />
  ) : null;

  console.log('viewer', viewer);

  return (
    <Layout>
      {logInErrorBannerElement}
      <TasksDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Flex justifyContent="center">
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
          My Tasks
        </Button>
      </Flex>
      <PomodoroTimer
        pomCycle={viewer.pomCycle}
        pomDuration={viewer.pomDuration}
        shortBreakDuration={viewer.shortBreakDuration}
        longBreakDuration={viewer.longBreakDuration}
        longBreakInterval={viewer.longBreakInterval}
        pomCount={viewer.pomCount}
      />
    </Layout>
  );
};

export default Index;
