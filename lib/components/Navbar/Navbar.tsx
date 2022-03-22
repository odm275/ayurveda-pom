import {
  Box,
  Flex,
  Collapse,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { Hamburger, MainMenu, SecondaryMenu, MobileNav } from "./components";

export const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Hamburger onToggle={onToggle} isOpen={isOpen} />
        <MainMenu />
        <SecondaryMenu />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};
