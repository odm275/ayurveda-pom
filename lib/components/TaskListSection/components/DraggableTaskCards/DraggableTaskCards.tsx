import { ReactNode, useRef } from "react";
import { Stack, Box } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useUpdateTasksPositionsMutation } from "@/lib/generated";
import { graphqlClient } from "@/apollo/graphql-request-client";
import { customSplice } from "./helpers";
import { queryKeys } from "@/lib/utils";
import { useQueryClient } from "react-query";
import { useCustomToast } from "@/lib/hooks/useCustomToast";

interface Props {
  children: ReactNode;
  tasks: any;
  setLastDraggedIndex: any;
  setLastDraggedSourceIndex: (arg: number) => void;
}

function sortTasks(tasks, result) {
  const items = Array.from(tasks);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);
  return items;
}

export const DraggableTaskCards = ({
  children,
  tasks,
  setLastDraggedIndex,
  setLastDraggedSourceIndex
}: Props) => {
  let tasksRef = useRef(); // Re-asign this ref during handleDragEnd to have tasks accesible onMutate
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate: updateTasksPositions } = useUpdateTasksPositionsMutation(
    graphqlClient,
    {
      // onSuccess: () => {
      //   queryClient.invalidateQueries([queryKeys.viewerCurrentTasks]);
      // },
      onMutate: () => {
        console.log("tasksRef", tasksRef);
        queryClient.cancelQueries(queryKeys.viewerCurrentTasks);
        const prevData: [] = queryClient.getQueryData(
          queryKeys.viewerCurrentTasks
        );
        queryClient.setQueryData(
          queryKeys.viewerCurrentTasks,
          tasksRef.current
        );
        return { prevData };
      },
      onError: async (error, newData, context) => {
        if (context.prevData) {
          queryClient.setQueryData(
            queryKeys.viewerCurrentTasks,
            context.prevData
          );

          toast({
            title: "Update Failed; restoring previous values",
            status: "warning"
          });
        }
        // rollback cache to saved value
      },
      onSettled: () => {
        // invalidate query to make sure we're both in sync with server
        queryClient.invalidateQueries(queryKeys.viewerCurrentTasks);
      }
    }
  );

  const handleSeverTasksPositionUpdate = ({
    tasks,
    draggedSourceIndex,
    draggedDestIndex
  }) => {
    // Get the tasks whose position changed from re-ordering the list of tasks.
    const tasksToUpdate = customSplice({
      tasks,
      index1: draggedSourceIndex,
      index2: draggedDestIndex
    });

    const taskIds = tasksToUpdate.map((task) => {
      return {
        id: task.id
      };
    });

    updateTasksPositions({ taskIds });
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    // Here we already calculated what the new tasks should be in state -> get to onMutate and update cache!

    const sortedTasks = sortTasks(tasks, result);
    tasksRef.current = sortedTasks;

    handleSeverTasksPositionUpdate({
      tasks: sortedTasks,
      draggedSourceIndex: result.source.index,
      draggedDestIndex: result.destination.index
    });

    setLastDraggedIndex(result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <Box
            className="TASKS"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Stack spacing={4}>
              {children}
              {provided.placeholder}
            </Stack>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
