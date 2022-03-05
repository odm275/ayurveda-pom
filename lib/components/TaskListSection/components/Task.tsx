import React, { useState } from "react";

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

interface Props {
  task: any;
  provided: any;
  addAmtTask: any;
  subAmtTask: any;
  deleteTask: any;
  index: number;
  snapshot: any;
  lastDraggedIndex: number;
}

export const Task = ({
  provided,
  task,
  addAmtTask,
  subAmtTask,
  deleteTask,
  index,
  snapshot,
  lastDraggedIndex
}: Props) => {
  const { amt, title, isFinished } = task;

  // const etaElement = (
  //   <Text color="gray.500" d={['none', 'block']}>
  //     {eta.toString()}
  //   </Text>
  // );

  const taskMenu = (
    <Flex align="center">
      <Button
        borderStyle="solid"
        borderColor="black"
        borderRadius={10}
        mx={2}
        onClick={addAmtTask}
      >
        <Text>{amt}</Text>
      </Button>
      <Menu>
        <MenuButton as={Button}>
          <Icon as={AiOutlineEllipsis} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={addAmtTask}>Add</MenuItem>
          <MenuItem onClick={subAmtTask}>Remove</MenuItem>
          <MenuItem onClick={deleteTask}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
  // const mobileEta = (
  //   <Text color="gray.500" d={['block', 'none']}>
  //     {eta.toString()}
  //   </Text>
  // );
  // ONLY SHOW IF TASK IS UNFINISHED

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

  // function getItemStyle(isDragging) {
  //   // return isDragging ? "0.5" : "1.0";
  //   if (isDragging) {
  //     return {
  //       opacity: 0.5
  //     };
  //   }
  // }
  // function getLastDraggedStyle(lastDraggedIndex, index) {
  //   // return lastDraggedIndex === index ? 'cyan.200' : '';
  //   if (lastDraggedIndex === index) {
  //     return {
  //       opacity: 0.5,
  //       background: "cyan.900"
  //     };
  //   }
  // }
  return (
    <>
      <style jsx>{`
        .isFinished {
          display: none;
        }
      `}</style>
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`${isFinished ? "isFinished" : ""}`}
        {...getItemStyles(snapshot.isDragging, lastDraggedIndex, index)}
        // opacity={getItemStyle(snapshot.isDragging)}
      >
        <Flex
          justify="space-between"
          align="center"
          // bg={index === 0 ? "yellow.600" : ""}
        >
          <Text>{task.title}</Text>
          <Spacer />
          {taskMenu}
          {index === 0 ? (
            <Icon as={RiStarSmileLine} ml={3} w={6} h={6} />
          ) : (
            <Icon as={RiStarSmileLine} ml={3} w={6} h={6} visibility="hidden" />
          )}
        </Flex>
        {/* <Text color="gray.500" d={['block', 'none']}>
        {mobileEta}
      </Text> */}
      </Box>
    </>
  );
};
