import React from 'react';

import { Flex, Text, Icon, Button } from '@chakra-ui/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

interface Props {
  value: string;
}

export const TaskInput = ({ value }: Props) => {
  return (
    <Flex justify="center">
      <Button
        width="100%"
        size="md"
        height="58px"
        border="2px"
        borderColor="green.500"
      >
        <Text fontSize={20}>
          <Icon as={AiOutlinePlusCircle} mr={1} />
          <span>Add Task</span>
        </Text>
      </Button>
    </Flex>
  );
};
