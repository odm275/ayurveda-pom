import React, { FunctionComponent } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { SidebarWithHeader } from "@/lib/components";

export const AppLayout: FunctionComponent = ({ children }) => {
  return (
    <Box w="100vw" h="100vh">
      <Flex minHeight="100%" flexDir="column">
        <SidebarWithHeader>{children}</SidebarWithHeader>
      </Flex>
    </Box>
  );
};
