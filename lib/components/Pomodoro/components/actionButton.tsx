import { Tooltip } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  isDisabled: boolean;
  children: ReactNode;
  onClick: () => void;
}

export const ActionButton = ({ isDisabled, children, onClick }: Props) => {
  return (
    <Tooltip
      isDisabled={isDisabled}
      label="Create a task to use pom"
      fontSize="md"
    >
      <span onClick={isDisabled ? null : onClick}>{children}</span>
    </Tooltip>
  );
};
