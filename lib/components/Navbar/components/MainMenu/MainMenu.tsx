import NextLink from "next/link";
import { Flex, Icon, useBreakpointValue, Link } from "@chakra-ui/react";
import { DesktopNav } from "./components";
import WindLogo from "../../../../../public/wind.svg";
export const MainMenu = () => (
  <Flex
    flex={{ base: 1 }}
    justify={{ base: "center", md: "start" }}
    alignItems="center"
  >
    <Link textAlign={useBreakpointValue({ base: "center", md: "left" })}>
      <NextLink href="/">
        <Icon as={WindLogo} w={12} h={12} fill="pink.400" />
      </NextLink>
    </Link>

    <Flex display={{ base: "none", md: "flex" }} ml={10}>
      <DesktopNav />
    </Flex>
  </Flex>
);
