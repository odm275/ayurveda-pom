import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
} from '@chakra-ui/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { UPDATE_TASKS } from '@/lib/graphql/mutations';

import { Task } from '@/lib/components/Task';
import AddTaskModal from '@/lib/components/AddTaskModal';
import {
  UpdateTasks as UpdatedTasksData,
  UpdateTasksVariables
} from '@/lib/graphql/mutations/UpdateTasks/__generated__/UpdateTasks';
import { useAuth } from '@/lib/context/AuthContext';
import { newPayload } from '@/lib/utils/omitTypename';

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

export const TasksDrawer = ({
  isOpen,
  onClose,
  btnRef,
  tasks,
  setTasks,
  loadingUpdateTasks
}: Props) => {
  // const [updateTasks, { loading, error }] = useMutation<
  //   UpdatedTasksData,
  //   UpdateTasksVariables
  // >(UPDATE_TASKS);
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
    console.log('wtf')
    // updateTasks({
    //   variables: {
    //     input: { tasks: tasks }
    //   }
    // });
    onClose();
  };

  const handleOnClose = () => {
    const oldTasks = tasks.filter((task) => !task.isNew);
    setTasks(oldTasks);
    onClose();
  };

  const tasksCards = tasks.map((task, i) => {
    const addAmtTask = (prevTasks) => {
      const copyAllTasks = Array.from(tasks);
      const updatedTaskData = {
        ...task,
        amt: task.amt + 1
      };
      copyAllTasks.splice(i, 1, updatedTaskData);

      return copyAllTasks;
    };

    const removeAmtTask = (prevTasks) => {
      const copyAllTasks = Array.from(tasks);
      const newAmt = task.amt - 1;

      const updatedTaskData = {
        ...task,
        amt: task.amt - 1,
        isFinished: newAmt < 1
      };
      copyAllTasks.splice(i, 1, updatedTaskData);

      return copyAllTasks;
    };

    
    const deleteTask = (prevTasks) => {
      const copyAllTasks = Array.from(tasks);

      copyAllTasks.splice(i, 1);

      return copyAllTasks;
    };

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
              {tasksCards}
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
