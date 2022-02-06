import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  title?: string;
  description?: string;
}

const SuccessBanner = ({
  title = 'Uh oh! Something went wrong :(',
  description = 'Look like something went wrong. Please check your connection and/or try again later.'
}: Props) => (
  <Alert status="success">
    <AlertIcon />
    <AlertTitle mr={2}>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
    <CloseButton position="absolute" right="8px" top="8px" />
  </Alert>
);

export default SuccessBanner;
