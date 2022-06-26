import React, { ReactNode, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent
} from "@chakra-ui/react";
import {
  DraggableTaskCards,
  TaskListBody,
  OutsideClick,
  Task
} from "./components";
import { Task as TaskType } from "@/lib/generated";
import { LoadingOverlay } from "../LoadingOverlay";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  btnRef: unknown;
  tasks: TaskType[];
}

export const TaskListSection = ({ isOpen, onClose, btnRef, tasks }: Props) => {
  const [lastDraggedIndex, setLastDraggedIndex] = useState(null);
  const [lastDraggedSourceIndex, setLastDraggedSourceIndex] = useState(null);

  const taskCards = tasks.map((task, i) => {
    return (
      <Draggable key={i} draggableId={`id-${i}`} index={i}>
        {(provided, snapshot) => (
          <Task
            task={task}
            provided={provided}
            index={i}
            snapshot={snapshot}
            lastDraggedIndex={lastDraggedIndex}
          />
        )}
      </Draggable>
    );
  });

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="full"
    >
      <DrawerOverlay>
        <LoadingOverlay isOpen={false}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>My Tasks</DrawerHeader>
            <TaskListBody tasks={tasks}>
              <OutsideClick setLastDraggedIndex={setLastDraggedIndex}>
                <DraggableTaskCards
                  tasks={tasks}
                  setLastDraggedIndex={setLastDraggedIndex}
                  setLastDraggedSourceIndex={setLastDraggedSourceIndex}
                >
                  {taskCards}
                </DraggableTaskCards>
              </OutsideClick>
            </TaskListBody>
          </DrawerContent>
        </LoadingOverlay>
      </DrawerOverlay>
    </Drawer>
  );
};
