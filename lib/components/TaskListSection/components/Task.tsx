import React, { useState } from "react";

import {
  Box,
  Flex,
  Text,
  Spacer,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Menu
} from "@chakra-ui/react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Icon } from "@chakra-ui/react";

interface Props {
  task: any;
  provided: any;
  addAmtTask: any;
  subAmtTask: any;
  deleteTask: any;
}

export const Task = ({
  provided,
  task,
  addAmtTask,
  subAmtTask,
  deleteTask
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
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      // style={{
      //   display: `${isFinished ? "none" : "block"}`,
      //   background: "tomato"
      // }}
    >
      <Flex justify="space-between" align="center">
        <Text>{task.title}</Text>
        <Spacer />
        {taskMenu}
      </Flex>
      {/* <Text color="gray.500" d={['block', 'none']}>
        {mobileEta}
      </Text> */}
    </div>
  );
};
