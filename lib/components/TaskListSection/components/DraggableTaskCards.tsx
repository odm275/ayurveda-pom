import React from "react";
import { Stack, Box } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export const DraggableTaskCards = ({ children, tasks, setTasks }) => {
  const handleOnDragEnd = (result) => {
    console.log("dragEnd");
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  function getListStyle(isDraggingOver) {
    return isDraggingOver ? "background" : "gray.80";
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {(provided, snapshot) => (
          <Box
            className="TASKS"
            {...provided.droppableProps}
            ref={provided.innerRef}
            backgroundColor={getListStyle(snapshot.isDraggingOver)}
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
