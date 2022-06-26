import { ReactNode } from "react";
import { Stack, Box } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useUpdateTasksPositionsMutation } from "@/lib/generated";
import { graphqlClient } from "@/apollo/graphql-request-client";
import { customSplice } from "./helpers";
interface Props {
  children: ReactNode;
  tasks: any;
  setLastDraggedIndex: any;
  setLastDraggedSourceIndex: (arg: number) => void;
}

export const DraggableTaskCards = ({
  children,
  tasks,
  setLastDraggedIndex,
  setLastDraggedSourceIndex
}: Props) => {
  const { mutate: updateTasksPositions } =
    useUpdateTasksPositionsMutation(graphqlClient);

  const handleSeverTasksPositionUpdate = ({
    tasks,
    draggedSourceIndex,
    draggedDestIndex
  }) => {
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

    updateTasksPositions({
      input: { taskIds }
    });
  };
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    handleSeverTasksPositionUpdate({
      tasks: items,
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
