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
import { useForm } from "react-hook-form";

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
  setTasks: (tasks) => void;
  tasks: [Task];
}

const AddTaskModal = ({ isOpen, onClose, setTasks, tasks }: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { title, amt } = data;
    const newTasks = [
      ...tasks,
      {
        title,
        amt: parseInt(amt),
        eta: "01-01-01",
        isNew: true
      }
    ];
    setTasks(newTasks);
    onClose();
  };

  const addTaskCard = (
    <Stack spacing={4} maxW="425px">
      <InputGroup>
        <Input
          type="text"
          placeholder="What task are you working on?"
          name="title"
          ref={register}
        />
      </InputGroup>
      <InputGroup>
        <NumberInput register={register} />
      </InputGroup>
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

export default AddTaskModal;
