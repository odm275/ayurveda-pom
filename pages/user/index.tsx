import { useState, useRef, useEffect } from "react";
import { Flex, Button, Spinner, useDisclosure } from "@chakra-ui/react";
import PomodoroTimer from "@/lib/components/PomodoroTimer";
import AppHeaderSkeleton from "@/lib/components/AppHeaderSkeleton";
import ErrorBanner from "@/lib/components/ErrorBanner";
import { Layout } from "@/lib/components/Layout";
import { useAuth } from "@/lib/context/AuthContext";
import { newPayload } from "@/lib/utils/omitTypename";
import { TaskListSection } from "@/lib/components/TaskListSection";
import { useUpdateTasksMutation, Task } from "@/lib/generated";

const Index = () => {
  const { viewer, error } = useAuth();

  // Update tasks whenever a new pomodoro cycle is completed
  const [tasks, setTasks] = useState<Task[] | null>([]);

  const [
    updateTasks,
    { loading: loadingUpdateTasks, error: updateTasksError }
  ] = useUpdateTasksMutation();

  useEffect(() => {
    const _tasks = viewer?.currentTasks?.result
      ? newPayload(viewer.currentTasks.result)
      : [];
    setTasks(_tasks);
  }, [viewer.didRequest]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();
  // User is loading
  if (!viewer.didRequest && !error) {
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

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We aren't able to verify if you were logged in. Please try again later!" />
  ) : null;

  return (
    <Layout>
      {logInErrorBannerElement}
      <TaskListSection
        tasks={tasks}
        setTasks={setTasks}
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        loadingUpdateTasks={loadingUpdateTasks}
      />
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
        tasks={tasks}
        setTasks={setTasks}
        updateTasks={updateTasks}
      />
    </Layout>
  );
};

export default Index;
