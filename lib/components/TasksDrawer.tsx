import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  btnRef: any;
}

export const TasksDrawer = ({ isOpen, onClose, btnRef }: Props) => {
  const { viewer } = useAuth();
  console.log('tasks', viewer.tasks);
  const _tasks = viewer?.tasks?.result ? newPayload(viewer.tasks.result) : [];
  console.log('newPayload', newPayload);

  const [tasks, setTasks] = useState<TaskType[]>(_tasks);
  const [updateTasks, { loading, error }] = useMutation<
    UpdatedTasksData,
    UpdateTasksVariables
  >(UPDATE_TASKS, {
    onError: (err) => {
      console.log(err);
    }
  });
  const { register, handleSubmit } = useForm();
  const {
    isOpen: openAddTask,
    onOpen: openNewTaskForm,
    onClose: closeAddTaskForm
  } = useDisclosure();

  const tasksCards = tasks.map(({ title, amt, eta }, i) => (
    <Draggable key={`${i}`} draggableId={`${i}`} index={i}>
      {(provided) => (
        <Task
          title={title}
          amt={amt}
          eta={eta}
          key={i}
          register={register}
          innerRef={provided.innerRef}
          provided={provided}
        />
      )}
    </Draggable>
  ));

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

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

  const onSave = () => {
    console.log('on save');
    console.log('tasks', tasks);
    updateTasks({
      variables: {
        input: { tasks: tasks }
      }
    })
      .then((v) => console.log(v))
      .catch((e) => console.log(e));
  };

  const handleOnClose = () => {
    const oldTasks = tasks.filter((task) => !task.isNew);
    setTasks(oldTasks);
    onClose();
  };

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
      size="xl"
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
