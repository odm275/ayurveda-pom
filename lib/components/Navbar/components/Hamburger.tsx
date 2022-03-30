import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const Hamburger = ({ isOpen, onToggle }: Props) => (
  <Flex
    flex={{ base: 1, md: "auto" }}
    ml={{ base: -2 }}
    display={{ base: "flex", md: "none" }}
  >
    <IconButton
      onClick={onToggle}
      icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
      variant={"ghost"}
      aria-label={"Toggle Navigation"}
    />
  </Flex>
);
