import React, { useState } from "react";
import { QueryClient, useQueryClient } from "react-query";
import {
  Flex,
  Text,
  Spacer,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Box
} from "@chakra-ui/react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { RiStarSmileLine } from "react-icons/ri";
import { Icon } from "@chakra-ui/react";
import { getUrgencyColor, getUrgencyPercentage } from "./helper";
import {
  useDeleteTaskMutation,
  useUpdateTaskAmtMutation
} from "@/lib/generated";
import { graphqlClient } from "@/apollo/graphql-request-client";

interface Props {
  task: any;
  provided: any;
  index: number;
  snapshot: any;
  lastDraggedIndex: number;
}

export const Task = ({
  provided,
  task,
  index,
  snapshot,
  lastDraggedIndex
}: Props) => {
  const { amt, title, isFinished, createdAt, eta, id } = task;
  const queryClient = useQueryClient();

  const { mutate: updateTask } = useUpdateTaskAmtMutation(graphqlClient);

  const { mutate: deleteTask } = useDeleteTaskMutation(graphqlClient);

  const handleAddTaskAmt = (id: string) => {
    updateTask({
      taskId: id,
      op: "add"
    });
  };
  const handleSubTaskAmt = (id: string) => {
    updateTask({
      taskId: id,
      op: "sub"
    });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(
      {
        taskId: id
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["viewerCurrentTasks"]);
        },
        onError: (e) => console.log(e)
      }
    );
  };

  const taskMenu = (
    <Flex align="center">
      <Box
        w="30px"
        h="30px"
        bgGradient={getUrgencyColor(getUrgencyPercentage(createdAt, eta))}
        borderRadius="full"
      />
      <Button
        borderStyle="solid"
        borderColor="black"
        borderRadius={10}
        mx={2}
        onClick={() => handleAddTaskAmt(id)}
      >
        <Text>{amt}</Text>
      </Button>
      <Menu>
        <MenuButton as={Button}>
          <Icon as={AiOutlineEllipsis} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleAddTaskAmt(id)}>Add</MenuItem>
          <MenuItem onClick={() => handleSubTaskAmt(id)}>Remove</MenuItem>
          <MenuItem onClick={() => handleDeleteTask(id)}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );

  function getItemStyles(isDragging, lastDraggedIndex, index) {
    if (isDragging) {
      return {
        opacity: 0.5
      };
    }
    if (lastDraggedIndex === index) {
      return {
        opacity: 0.5,
        background: "cyan.900"
      };
    }
  }

  return (
    <>
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        {...getItemStyles(snapshot.isDragging, lastDraggedIndex, index)}
      >
        <Flex justify="space-between" align="center">
          <Text>{task.title}</Text>
          <Spacer />
          {taskMenu}
          {index === 0 ? (
            <Icon as={RiStarSmileLine} ml={3} w={6} h={6} />
          ) : (
            <Icon as={RiStarSmileLine} ml={3} w={6} h={6} visibility="hidden" />
          )}
        </Flex>
      </Box>
    </>
  );
};
