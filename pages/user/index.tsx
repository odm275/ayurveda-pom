import { useRef } from "react";
import { Flex, Button, useDisclosure } from "@chakra-ui/react";
import { Pomodoro } from "@/lib/components";
import { AppLayout } from "@/lib/components/AppLayout";
import { useUser, useUserTasks } from "@/lib/hooks";
import { TaskListSection } from "@/lib/components/TaskListSection";

import { withProtectedRoute } from "@/lib/utils/withProtectedRoute";
import { ClientOnly } from "@/lib/components/ClientOnly";

const Index = () => {
  const { user } = useUser();
  const { tasks } = useUserTasks();

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
            <Pomodoro />
          </>
        )}
      </AppLayout>
    </ClientOnly>
  );
};

export default withProtectedRoute(Index);
