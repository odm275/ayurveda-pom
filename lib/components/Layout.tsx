import React, { FunctionComponent } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { AppHeader } from '@/lib/components/AppHeader';

export const Layout: FunctionComponent = ({ children }) => {
  return (
    <Box w="100vw" h="100vh">
      <Flex minHeight="100%" flexDir="column" overflowX="hidden">
        <AppHeader />
        <Box
          flexGrow={1}
          position={['static', 'relative']}
          left="100px"
          borderTopLeftRadius={['10px', '35px']}
          borderTopRightRadius={['10px', '0']}
          p={5}
        >
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
