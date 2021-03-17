import React, { useState } from 'react';

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
} from '@chakra-ui/react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { Icon } from '@chakra-ui/react';

interface Props {
  task: any;
  register: any;
  innerRef: any;
  provided: any;
  addAmtTask: any;
}

export const Task = ({
  register,
  innerRef,
  provided,
  task,
  addAmtTask
}: Props) => {
  const { amt, title } = task;

  // const subAmtTask = () => {
  //   if (amt <= 0) {
  //     return;
  //   }
  //   setAmt(amt - 1);
  // };

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
          <MenuItem onClick={addAmtTask}>Add More</MenuItem>
          <MenuItem onClick={addAmtTask}>Remove</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
  // const mobileEta = (
  //   <Text color="gray.500" d={['block', 'none']}>
  //     {eta.toString()}
  //   </Text>
  // );

  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      <input
        name={`${task.title}`}
        type="number"
        value={amt}
        style={{ display: 'none' }}
        ref={register}
      />
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
