import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const PageLayout = ({ children }) => {
  return (
    <Flex flexDirection="column" h="100vh">
      <Navbar />
      <Box flex="1">{children}</Box>
      <Footer />
    </Flex>
  );
};
