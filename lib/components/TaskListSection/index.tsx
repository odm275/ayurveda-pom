import React, { ReactNode, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent
} from "@chakra-ui/react";
import { useTaskHandlers } from "./hooks";
import {
  DraggableTaskCards,
  TaskListBody,
  OutsideClick,
  Task
} from "./components";
import {
  Task as TaskType,
  useDeleteTaskMutation,
  useViewerCurrentTasksQuery
} from "@/lib/generated";
import { LoadingOverlay } from "../LoadingOverlay";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  btnRef: unknown;
  tasks: TaskType[];
  setTasks: (any) => void;
  loadingUpdateTasks?: boolean;
  tasksLoading: boolean;
}

export const TaskListSection = ({
  isOpen,
  onClose,
  btnRef,
  tasks,
  setTasks,
  loadingUpdateTasks,
  tasksLoading
}: Props) => {
  const [lastDraggedIndex, setLastDraggedIndex] = useState(null);
  const [lastDraggedSourceIndex, setLastDraggedSourceIndex] = useState(null);

  const { addAmtTask, removeAmtTask, deleteTask } = useTaskHandlers();

  const [deleteViewerTask] = useDeleteTaskMutation({
    onCompleted: (task) => {
      const newTaskArr = deleteTask(task);
      setTasks(newTaskArr);
    }
  });

  const handleDeleteTask = ({ task }) => {
    deleteViewerTask({
      variables: {
        input: {
          id: task.id
        }
      }
    });
  };

  const taskCards = tasks.map((task, i) => {
    return (
      <Draggable key={i} draggableId={`id-${i}`} index={i}>
        {(provided, snapshot) => (
          <Task
            task={task}
            provided={provided}
            addAmtTask={() => setTasks(addAmtTask)}
            subAmtTask={() => setTasks(removeAmtTask)}
            deleteTask={() => handleDeleteTask({ task })}
            index={i}
            snapshot={snapshot}
            lastDraggedIndex={lastDraggedIndex}
          />
        )}
      </Draggable>
    );
  });

  if (tasksLoading) {
    return null;
  }

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
            <TaskListBody tasks={tasks} setTasks={setTasks}>
              <OutsideClick setLastDraggedIndex={setLastDraggedIndex}>
                <DraggableTaskCards
                  tasks={tasks}
                  setTasks={setTasks}
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
