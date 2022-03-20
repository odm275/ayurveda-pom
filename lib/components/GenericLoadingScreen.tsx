import { Flex, Spinner } from "@chakra-ui/react";
import AppHeaderSkeleton from "./AppHeaderSkeleton";

export const GenericLoadingScreen = () => (
  <Flex flexDir="column" p={3} w="100%" h="100vh">
    <AppHeaderSkeleton />
    <Flex justifyContent="center" w="100%" h="100%" alignItems="center">
      <Spinner speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  </Flex>
);
