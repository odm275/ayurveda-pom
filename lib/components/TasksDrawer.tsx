import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { Task } from '@/lib/components/Task';
import AddTaskModal from '@/lib/components/AddTaskModal';

const dummyTasks = [
  {
    title: 'Code in python',
    amt: 5,
    eta: new Date(),
    category: 'personal',
    new: false
  },
  {
    title: 'React Course',
    amt: 4,
    eta: new Date(),
    category: 'personal',
    new: false
  },
  {
    title: 'Read Complex Analysis',
    amt: 2,
    eta: new Date(),
    category: 'personal',
    new: false
  },
  {
    title: 'Book Club Read',
    amt: 2,
    eta: new Date(),
    category: 'personal',
    new: false
  },
  {
    title: 'Meditate',
    amt: 1,
    eta: new Date(),
    category: 'personal',
    new: false
  }
];

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
  const [tasks, setTasks] = useState([]);
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

  const onSubmit = (data) => {
    console.log('form data', data);
  };

  const handleOnClose = () => {
    const oldTasks = tasks.filter((task) => !task.new);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>My Tasks</DrawerHeader>
            {drawerBody}
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={handleOnClose}>
                Cancel
              </Button>
              <Button color="blue" type="submit">
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </form>
    </Drawer>
  );
};
