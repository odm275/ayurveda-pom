import { Modal, ModalContent, ModalOverlay, Spinner } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isOpen: boolean;
}

export const LoadingOverlay = ({ children, isOpen }: Props) => (
  <>
    {children}
    <Modal isOpen={isOpen}>
      <ModalOverlay />
    </Modal>
  </>
);
