import { useState, useRef } from "react";
import { Flex, Button, Spinner, useDisclosure } from "@chakra-ui/react";
import { graphqlClient } from "@/apollo/graphql-request-client";
import { Pomodoro } from "@/lib/components";
import AppHeaderSkeleton from "@/lib/components/AppHeaderSkeleton";
import ErrorBanner from "@/lib/components/ErrorBanner";
import { AppLayout } from "@/lib/components/AppLayout";
// import { useAuth } from "@/lib/context/AuthContext";
import { useUser } from "@/lib/hooks";
import { TaskListSection } from "@/lib/components/TaskListSection";
import { Task, useMeQuery, useViewerCurrentTasksQuery } from "@/lib/generated";
import { withProtectedRoute } from "@/lib/utils/withProtectedRoute";
import { ClientOnly } from "@/lib/components/ClientOnly";

const Index = () => {
  const { user } = useUser();

  const { data } = useViewerCurrentTasksQuery(graphqlClient, undefined, {
    enabled: !!user
  });
  const tasks = data?.viewerCurrentTasks ? data.viewerCurrentTasks : [];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();

  return (
    <ClientOnly>
      <AppLayout>
        {user && (
          <>
            <TaskListSection
              tasks={tasks}
              isOpen={isOpen}
              onClose={onClose}
              btnRef={btnRef}
            />
            <Flex justifyContent="center">
              <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                My Tasks
              </Button>
            </Flex>
            {/* <Pomodoro
          //   pomCycle={user.pomCycle}
          //   pomDuration={user.pomDuration}
          //   shortBreakDuration={user.shortBreakDuration}
          //   longBreakDuration={user.longBreakDuration}
          //   longBreakInterval={user.longBreakInterval}
          //   pomCount={user.pomCount}
          //   setViewer={() => null}
          //   tasks={tasks}
          //   setTasks={setTasks}
          // /> */}
          </>
        )}
      </AppLayout>
    </ClientOnly>
  );
};

export default withProtectedRoute(Index);
