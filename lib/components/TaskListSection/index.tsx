import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerFooter,
  useDisclosure
} from "@chakra-ui/react";
import { useTaskHandlers } from "./hooks";
import {
  DraggableTaskCards,
  TaskListBody,
  OutsideClick,
  Task
} from "./components";
import { useUpdateTasksMutation, Task as TaskType } from "@/lib/generated";
import { LoadingOverlay } from "../LoadingOverlay";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  btnRef: any;
  tasks: TaskType[];
  setTasks: (any) => void;
  loadingUpdateTasks: boolean;
}

export const TaskListSection = ({
  isOpen,
  onClose,
  btnRef,
  tasks,
  setTasks,
  loadingUpdateTasks
}: Props) => {
  const [updateTasks, { loading, error }] = useUpdateTasksMutation();
  // const { isOpen: loadingOverlayIsOpen, onClose: loadingOverlayOnClose } =
  //   useDisclosure();

  const [lastDraggedIndex, setLastDraggedIndex] = useState(null);

  const onSave = () => {
    // ToDo?: after update Tasks is successful -> update Tasks with response from server.
    updateTasks({
      variables: {
        input: { tasks: tasks }
      },
      onCompleted: (data) => {
        console.log(data);
        onClose();
      }
    });
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
      <Draggable key={i} draggableId={`id-${i}`} index={i}>
        {(provided, snapshot) => (
          <Task
            task={task}
            provided={provided}
            addAmtTask={() => setTasks(addAmtTask)}
            subAmtTask={() => setTasks(removeAmtTask)}
            deleteTask={() => setTasks(deleteTask)}
            index={i}
            snapshot={snapshot}
            lastDraggedIndex={lastDraggedIndex}
          />
        )}
      </Draggable>
    );
  });

  // console.log(getBorderRadius(tasks));

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="full"
    >
      <DrawerOverlay>
        <LoadingOverlay isOpen={loading}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>My Tasks</DrawerHeader>
            <TaskListBody tasks={tasks} setTasks={setTasks}>
              <OutsideClick setLastDraggedIndex={setLastDraggedIndex}>
                <DraggableTaskCards
                  tasks={tasks}
                  setTasks={setTasks}
                  setLastDraggedIndex={setLastDraggedIndex}
                >
                  {taskCards}
                </DraggableTaskCards>
              </OutsideClick>
            </TaskListBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={handleOnClose}>
                Cancel
              </Button>
              <Button color="blue" type="submit" onClick={onSave}>
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </LoadingOverlay>
      </DrawerOverlay>
    </Drawer>
  );
};
