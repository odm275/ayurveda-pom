import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton
} from '@chakra-ui/react';

interface Props {
  title?: string;
  description?: string;
}

const ErrorBanner = ({
  title = 'Uh oh! Something went wrong :(',
  description = 'Look like something went wrong. Please check your connection and/or try again later.'
}: Props) => (
  <Alert status="error">
    <AlertIcon />
    <AlertTitle mr={2}>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
    <CloseButton position="absolute" right="8px" top="8px" />
  </Alert>
);

export default ErrorBanner;
