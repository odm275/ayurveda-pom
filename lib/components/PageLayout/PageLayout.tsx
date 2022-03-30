import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

interface Props {
  children: ReactNode;
}

export const PageLayout = ({ children }: Props) => {
  return (
    <Flex flexDirection="column" h="100vh">
      <Navbar />
      <Box flex="1">{children}</Box>
      <Footer />
    </Flex>
  );
};
