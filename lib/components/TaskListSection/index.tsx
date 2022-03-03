import React from "react";
import { useMutation } from "@apollo/client";
import { Draggable } from "react-beautiful-dnd";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerFooter
} from "@chakra-ui/react";
import { UPDATE_TASKS } from "@/lib/graphql/mutations";
import { Task } from "@/lib/components/TaskListSection/components/Task";
import {
  UpdateTasks as UpdatedTasksData,
  UpdateTasksVariables
} from "@/lib/graphql/mutations/UpdateTasks/__generated__/UpdateTasks";
import { useTaskHandlers } from "./hooks";
import { DraggableTaskCards, TaskListBody } from "./components";

export interface TaskType {
  title: string | null;
  amt: number | null;
  eta: string | null;
  isNew: boolean | null;
  positionId: number;
}
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
  const [updateTasks, { loading, error }] = useMutation<
    UpdatedTasksData,
    UpdateTasksVariables
  >(UPDATE_TASKS);

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
          <TaskListBody tasks={tasks} setTasks={setTasks}>
            <DraggableTaskCards tasks={tasks} setTasks={setTasks}>
              {taskCards}
            </DraggableTaskCards>
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
      </DrawerOverlay>
    </Drawer>
  );
};
