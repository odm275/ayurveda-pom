import React from 'react';
import { Heading, Text, Box, Flex, Button } from '@chakra-ui/react';

interface Props {
  icon: any;
  heading: string;
  desc: string;
  onClick: () => void;
}

const SelectionCard = ({ icon, heading, desc, onClick }: Props) => (
  <Flex
    flexDir="column"
    width="300px"
    borderStyle="solid"
    borderColor="black"
    borderWidth="2px"
  >
    <Flex justify="center" align="center" bgColor="red.400" mHeight="200px">
      {icon}
    </Flex>
    <Box bg="gray.200">
      <Heading as="h4" textAlign="center">
        {heading}
      </Heading>
      <Text>{desc}</Text>
      <Button onClick={onClick}>Select</Button>
    </Box>
  </Flex>
);

export default SelectionCard;
