import { useState, useRef, useEffect } from "react";
import { Flex, Button, Spinner, useDisclosure } from "@chakra-ui/react";
import { Pomodoro } from "@/lib/components";
import AppHeaderSkeleton from "@/lib/components/AppHeaderSkeleton";
import ErrorBanner from "@/lib/components/ErrorBanner";
import { AppLayout } from "@/lib/components/AppLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { TaskListSection } from "@/lib/components/TaskListSection";
import { Task } from "@/lib/generated";
import { withProtectedRoute } from "@/lib/utils/withProtectedRoute";

const Index = () => {
  const {
    viewer,
    loading: loadingUser,
    error: errorUser,
    setViewer
  } = useAuth();

  const [tasks, setTasks] = useState<Task[] | null>([]);
  console.log(viewer);

  // Sync Tas
  useEffect(() => {
    if (viewer?.tasks) {
      setTasks(viewer.tasks);
    }
  }, [viewer.didRequest]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();
  // User is loading
  if (loadingUser) {
    return (
      <Flex flexDir="column" p={3} w="100%" h="100vh">
        <AppHeaderSkeleton />
        <Flex justifyContent="center" w="100%" h="100%" alignItems="center">
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

  const logInErrorBannerElement = errorUser ? (
    <ErrorBanner description="We aren't able to verify if you were logged in. Please try again later!" />
  ) : null;

  return (
    <AppLayout>
      {logInErrorBannerElement}
      <TaskListSection
        tasks={tasks}
        setTasks={setTasks}
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        loadingUpdateTasks={false}
      />
      <Flex justifyContent="center">
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
          My Tasks
        </Button>
      </Flex>
      <Pomodoro
        pomCycle={viewer.pomCycle}
        pomDuration={viewer.pomDuration}
        shortBreakDuration={viewer.shortBreakDuration}
        longBreakDuration={viewer.longBreakDuration}
        longBreakInterval={viewer.longBreakInterval}
        pomCount={viewer.pomCount}
        tasks={viewer.tasks}
        setTasks={setTasks}
        setViewer={setViewer}
      />
    </AppLayout>
  );
};

export default withProtectedRoute(Index);
