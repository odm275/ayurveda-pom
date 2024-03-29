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
  Box,
  toast
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
import { queryKeys } from "@/lib/utils";
import { useCustomToast } from "@/lib/hooks";

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
  const toast = useCustomToast();

  const { mutate: updateTask } = useUpdateTaskAmtMutation(graphqlClient, {
    onMutate: async ({ taskId, op }) => {
      // cancel any outgoing queries for user data, so old server data
      // doesn't override our optimisitc update
      queryClient.cancelQueries(queryKeys.viewerCurrentTasks);
      // snapshot of previous viewerCurrent Tasks
      const prevData: [] = queryClient.getQueryData(
        queryKeys.viewerCurrentTasks
      );
      const tasksCopy = Array.from(prevData);
      const indexOfTask = tasksCopy.findIndex((task) => task.id === taskId);
      const taskToUpdateCopy = tasksCopy.find((task) => task.id === taskId);
      const updatedTask = {
        ...taskToUpdateCopy,
        amt: op === "add" ? taskToUpdateCopy.amt + 1 : taskToUpdateCopy.amt - 1
      };

      tasksCopy.splice(indexOfTask, 1, updatedTask);
      // optimistically update the cache with the new value
      queryClient.setQueryData(queryKeys.viewerCurrentTasks, tasksCopy);
      // return context with snapshotted object value
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
  });

  const { mutate: deleteTask } = useDeleteTaskMutation(graphqlClient, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.viewerCurrentTasks]);
    }
  });

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
    deleteTask({
      taskId: id
    });
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
