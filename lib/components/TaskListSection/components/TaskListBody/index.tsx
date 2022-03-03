import React from "react";
import { DrawerBody, Box, useDisclosure } from "@chakra-ui/react";
import { AddTaskButton, AddTaskModal } from "./components";

export const TaskListBody = ({ children, tasks, setTasks }) => {
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
          setTasks={setTasks}
        />
      </Box>
      <Box mt={10}>{children}</Box>
    </DrawerBody>
  );
};
