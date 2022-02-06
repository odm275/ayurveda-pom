import React from 'react';
import { Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const AppHeaderSkeleton = () => {
  return (
    <Flex bg="white" flexDir="row-reverse">
      <SkeletonCircle size="10" p={0} />
    </Flex>
  );
};

export default AppHeaderSkeleton;
