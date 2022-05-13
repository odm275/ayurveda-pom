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
import {
  useUpdateTasksPositionsMutation,
  Task as TaskType,
  useDeleteTaskMutation
} from "@/lib/generated";
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
  const [lastDraggedIndex, setLastDraggedIndex] = useState(null);
  const [lastDraggedSourceIndex, setLastDraggedSourceIndex] = useState(null);

  const [updateTasksPositions, { loading, error }] =
    useUpdateTasksPositionsMutation({
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.log(err);
      }
    });
  const { addAmtTask, removeAmtTask, deleteTask } = useTaskHandlers();

  const [deleteViewerTask] = useDeleteTaskMutation({
    onCompleted: (task) => {
      const newTaskArr = deleteTask(task);
      setTasks(newTaskArr);
    }
  });

  const onSave = () => {
    // Todo: Think about whether I need to update state here after saving state in the server.
    const taskIds = tasks.map((task) => {
      return {
        id: task.id
      };
    });
    console.log("taskIds", taskIds);
    updateTasksPositions({
      variables: {
        input: { taskIds }
      }
    });
  };

  const handleOnClose = () => {
    // Todo: If tasks arent's saved, I wanna be able to reset
    // them to their initial state when the task drawer was opened
    onClose();
  };

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
                  setLastDraggedSourceIndex={setLastDraggedSourceIndex}
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
