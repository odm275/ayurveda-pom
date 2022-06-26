import React from "react";
import {
  Button,
  Input,
  InputGroup,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import NumberInput from "@/lib/components/NumberInput";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateTaskMutation } from "@/lib/generated";
import { graphqlClient } from "@/apollo/graphql-request-client";
import { queryKeys } from "@/lib/utils";
import { useQueryClient } from "react-query";

interface Task {
  title: string;
  amt: number;
  eta: string;
  category: string;
  new: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tasks: [Task];
}

export const AddTaskModal = ({ isOpen, onClose, tasks }: Props) => {
  const queryClient = useQueryClient();

  const { control, register, handleSubmit } = useForm();
  const { mutate: createTask } = useCreateTaskMutation(graphqlClient, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.viewerCurrentTasks);
      onClose();
    }
  });
  const onSubmit = (data) => {
    const { title, amt, eta } = data;
    createTask({
      input: {
        title,
        amt: parseInt(amt),
        eta,
        positionId: tasks.length + 1
      }
    });
  };

  const addTaskCard = (
    <Stack spacing={4} maxW="425px">
      <InputGroup>
        <Input
          type="text"
          placeholder="What task are you working on?"
          name="title"
          {...register("title")}
        />
      </InputGroup>
      <InputGroup>
        <NumberInput register={register} />
      </InputGroup>
      <Controller
        control={control}
        name="eta"
        render={({ field }) => (
          <DatePicker
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            selected={field.value}
          />
        )}
      />
    </Stack>
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{addTaskCard}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" type="submit">
              Create Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
