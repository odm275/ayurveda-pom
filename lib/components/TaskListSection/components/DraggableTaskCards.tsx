import React from "react";
import { Stack, Box } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export const DraggableTaskCards = ({
  children,
  tasks,
  setTasks,
  setLastDraggedIndex
}) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLastDraggedIndex(result.destination.index);
    setTasks(items);
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
