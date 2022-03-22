import {
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue
} from "@chakra-ui/react";
import { DesktopNav } from "./components";

export const MainMenu = () => (
  <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
    <Text
      textAlign={useBreakpointValue({ base: "center", md: "left" })}
      fontFamily={"heading"}
      color={useColorModeValue("gray.800", "white")}
    >
      Logo
    </Text>

    <Flex display={{ base: "none", md: "flex" }} ml={10}>
      <DesktopNav />
    </Flex>
  </Flex>
);
