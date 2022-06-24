import { useState, useRef } from "react";
import { Flex, Button, Spinner, useDisclosure } from "@chakra-ui/react";
import { Pomodoro } from "@/lib/components";
import AppHeaderSkeleton from "@/lib/components/AppHeaderSkeleton";
import ErrorBanner from "@/lib/components/ErrorBanner";
import { AppLayout } from "@/lib/components/AppLayout";
import { useAuth } from "@/lib/context/AuthContext";
import { TaskListSection } from "@/lib/components/TaskListSection";
import { Task, useMeQuery, useViewerCurrentTasksQuery } from "@/lib/generated";
import { withProtectedRoute } from "@/lib/utils/withProtectedRoute";
import { ClientOnly } from "@/lib/components/ClientOnly";

const Index = () => {
  const {
    viewer,
    loading: loadingUser,
    error: errorUser,
    setViewer
  } = useAuth();

  const [tasks, setTasks] = useState<Task[] | null>([]);

  const { loading: tasksLoading } = useViewerCurrentTasksQuery({
    onCompleted: (data) => {
      if (data?.viewerCurrentTasks) {
        setTasks(data.viewerCurrentTasks);
      }
    }
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();
  // User is loading
  if (loadingUser || !viewer) {
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
    <ClientOnly>
      <AppLayout>
        {logInErrorBannerElement}
        <TaskListSection
          tasksLoading={tasksLoading}
          tasks={tasks}
          setTasks={setTasks}
          isOpen={isOpen}
          onClose={onClose}
          btnRef={btnRef}
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
          setViewer={setViewer}
          tasks={tasks}
          setTasks={setTasks}
        />
      </AppLayout>
    </ClientOnly>
  );
};

export default withProtectedRoute(Index);
