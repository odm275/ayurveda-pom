import { ReactNode } from "react";
import { DrawerBody, Box, useDisclosure } from "@chakra-ui/react";
import { AddTaskButton, AddTaskModal } from "./components";

interface Props {
  children: ReactNode;
  tasks: any;
}

export const TaskListBody = ({ children, tasks }: Props) => {
  const {
    isOpen: openAddTask,
    onOpen: openNewTaskForm,
    onClose: closeAddTaskForm
  } = useDisclosure();
  return (
    <DrawerBody>
      <AddTaskButton onClick={openNewTaskForm} />
      <Box mt={10}>
        <AddTaskModal
          isOpen={openAddTask}
          onClose={closeAddTaskForm}
          tasks={tasks}
        />
      </Box>
      <Box mt={10}>{children}</Box>
    </DrawerBody>
  );
};
