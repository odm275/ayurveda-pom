import React from "react";
import { Button, Text, Flex, Icon } from "@chakra-ui/react";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface Props {
  onClick: () => void;
}
export const AddTaskButton = ({ onClick }: Props) => (
  <Flex justify="center">
    <Button
      width="100%"
      size="md"
      height="58px"
      border="2px"
      borderColor="green.500"
      onClick={onClick}
    >
      <Text fontSize={20}>
        <Icon as={AiOutlinePlusCircle} mr={1} />
        <span>Add Task</span>
      </Text>
    </Button>
  </Flex>
);
