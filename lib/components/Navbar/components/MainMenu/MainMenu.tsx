import NextLink from "next/link";
import { Flex, useBreakpointValue, Link } from "@chakra-ui/react";
import { DesktopNav } from "./components";
import { WindIcon } from "@/lib/components/WindIcon";
export const MainMenu = () => (
  <Flex
    flex={{ base: 1 }}
    justify={{ base: "center", md: "start" }}
    alignItems="center"
  >
    <Link textAlign={useBreakpointValue({ base: "center", md: "left" })}>
      <NextLink href="/">
        <WindIcon />
      </NextLink>
    </Link>

    <Flex display={{ base: "none", md: "flex" }} ml={10}>
      <DesktopNav />
    </Flex>
  </Flex>
);
