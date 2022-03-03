import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Button,
  Box,
  Stack,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  Flex,
  Text,
  Icon,
  useDisclosure
} from "@chakra-ui/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { UPDATE_TASKS } from "@/lib/graphql/mutations";

import { Task } from "@/lib/components/TaskListSection/components/Task";
import AddTaskModal from "@/lib/components/AddTaskModal";
import {
  UpdateTasks as UpdatedTasksData,
  UpdateTasksVariables
} from "@/lib/graphql/mutations/UpdateTasks/__generated__/UpdateTasks";
import { useAuth } from "@/lib/context/AuthContext";
import { newPayload } from "@/lib/utils/omitTypename";
import { useTaskHandlers } from "@/lib/components/TaskListSection/hooks";

export interface TaskType {
  title: string | null;
  amt: number | null;
  eta: string | null;
  isNew: boolean | null;
  positionId: number;
}

interface AddTaskButtonProps {
  onClick: () => void;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  btnRef: any;
  tasks: TaskType[];
  setTasks: (any) => void;
  loadingUpdateTasks: boolean;
}
const AddTaskButton = ({ onClick }: AddTaskButtonProps) => (
  <Flex justify="center">
    <Button
      width="100%"
      size="md"
      height="58px"
      border="2px"
      borderColor="green.500"
      onClick={onClick}
    >
      <Text fontSize={20}>
        <Icon as={AiOutlinePlusCircle} mr={1} />
        <span>Add Task</span>
      </Text>
    </Button>
  </Flex>
);

export const TaskListSection = ({
  isOpen,
  onClose,
  btnRef,
  tasks,
  setTasks,
  loadingUpdateTasks
}: Props) => {
  const [updateTasks, { loading, error }] = useMutation<
    UpdatedTasksData,
    UpdateTasksVariables
  >(UPDATE_TASKS);
  const {
    isOpen: openAddTask,
    onOpen: openNewTaskForm,
    onClose: closeAddTaskForm
  } = useDisclosure();

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const onSave = () => {
    // ToDo?: after update Tasks is successful -> update Tasks with response from server.
    updateTasks({
      variables: {
        input: { tasks: tasks }
      },
      onCompleted: (data) => {
        console.log(data);
      }
    });
    onClose();
  };

  const handleOnClose = () => {
    const oldTasks = tasks.filter((task) => !task.isNew);
    setTasks(oldTasks);
    onClose();
  };

  const taskCards = tasks.map((task, i) => {
    const { addAmtTask, removeAmtTask, deleteTask } = useTaskHandlers({
      task,
      tasks,
      index: i
    });
    return (
      <Draggable key={`${i}`} draggableId={`${i}`} index={i}>
        {(provided) => (
          <Task
            task={task}
            innerRef={provided.innerRef}
            provided={provided}
            addAmtTask={() => setTasks(addAmtTask)}
            subAmtTask={() => setTasks(removeAmtTask)}
            deleteTask={() => setTasks(deleteTask)}
          />
        )}
      </Draggable>
    );
  });

  const draggableTaskCards = (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="TASKS">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Stack spacing={4}>
              {taskCards}
              {provided.placeholder}
            </Stack>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

  const drawerBody = (
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
      <Box mt={10}>{draggableTaskCards}</Box>
    </DrawerBody>
  );

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="full"
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My Tasks</DrawerHeader>
          {drawerBody}
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={handleOnClose}>
              Cancel
            </Button>
            <Button color="blue" type="submit" onClick={onSave}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
