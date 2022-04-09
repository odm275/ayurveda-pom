import { Tooltip } from "@chakra-ui/react";
import { ReactNode } from "react";
interface Props {
  isDisabled: boolean;
  children: ReactNode;
}

export const ActionButton = ({ isDisabled, children }: Props) => {
  return (
    <Tooltip
      isDisabled={isDisabled}
      label="Create a Task to use the Pom"
      fontSize="md"
    >
      <span>{children}</span>
    </Tooltip>
  );
};
