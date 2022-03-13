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
  const { amt, title, isFinished, createdAt, eta } = task;
  // const etaElement = (
  //   <Text color="gray.500" d={['none', 'block']}>
  //     {eta.toString()}
  //   </Text>
  // );

  function millisecondsToHours(milliseconds: number) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return hours;
  }

  function getUrgencyPercentage(createdAt: string, eta: string) {
    const createdAtTime = millisecondsToHours(new Date(createdAt).getTime());
    const etaTime = millisecondsToHours(new Date(eta).getTime());
    const now = millisecondsToHours(new Date().getTime());
    const result = ((etaTime - now) / (etaTime - createdAtTime)) * 100;

    return result;
  }

  function colorLineGenerator(num: number, color: string, position?: string) {
    let str = "";
    for (let i = 0; i < num; i++) {
      if (position === "end" && i === num - 1) {
        str += ` ${color}`;
      } else {
        str += ` ${color},`;
      }
    }
    return str;
  }

  function generateBgGradient(numCol1: number, numCol2: number) {
    return `linear(to-r,${colorLineGenerator(
      numCol1,
      "green.400"
    )},${colorLineGenerator(numCol2, "red.400", "end")})`;
  }

  function getUrgencyColor(num: number) {
    if (num >= 100) return generateBgGradient(10, 0);
    if (num < 100 && num >= 90) return generateBgGradient(9, 1);
    if (num < 90 && num >= 80) return generateBgGradient(8, 2);
    if (num < 80 && num >= 70) return generateBgGradient(7, 3);
    if (num < 70 && num >= 60) return generateBgGradient(6, 4);
    if (num < 60 && num >= 50) return generateBgGradient(5, 5);
    if (num < 50 && num >= 40) return generateBgGradient(4, 6);
    if (num < 40 && num >= 30) return generateBgGradient(3, 7);
    if (num < 30 && num >= 20) return generateBgGradient(2, 8);
    if (num < 20 && num >= 10) return generateBgGradient(1, 9);
    if (num < 10) return generateBgGradient(0, 10);

    console.log("something went wrong");
  }

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

  return (
    <>
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`${isFinished ? "isFinished" : ""}`}
        display={isFinished ? "none" : ""}
        {...getItemStyles(snapshot.isDragging, lastDraggedIndex, index)}
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
