import React from 'react';
import { createStandaloneToast } from '@chakra-ui/react';

export const displayErrorNotification = (
  title: string,
  description?: string
) => {
  const toast = createStandaloneToast();
  return toast({
    title: title,
    description: description,
    status: 'error',
    position: 'bottom'
  });
};

export const displaySuccessNotification = (
  title: string,
  description?: string
) => {
  const toast = createStandaloneToast();
  return toast({
    title: title,
    description: description,
    status: 'success',
    position: 'bottom'
  });
};
