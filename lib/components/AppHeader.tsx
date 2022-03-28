import React, { useState } from "react";
import { default as NextLink } from "next/link";
import {
  Flex,
  Box,
  Link,
  Heading,
  Spacer,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { BiStats, BiTimer } from "react-icons/bi";
import { VscSettingsGear } from "react-icons/vsc";
import { useAuth } from "@/lib/context/AuthContext";
import {
  displaySuccessNotification,
  displayErrorNotification
} from "@/lib/utils/toast";
import { initialViewer } from "../context";
import { useLogOutMutation } from "../generated";

export const AppHeader = () => {
  const { viewer, setViewer, isAuthenticated } = useAuth();

  const [isOpen, setOpen] = useState(false);

  const [logOut] = useLogOutMutation({
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(initialViewer);

        sessionStorage.removeItem("token");
        displaySuccessNotification(
          "You've succesfully logged out!",
          "Thank you"
        );
      }
    },
    onError: () => {
      displayErrorNotification(
        "Sorry! We weren't able to log you out. Please try again later!"
      );
    }
  });

  const handleLogOut = () => {
    logOut();
  };

  const loginButton = (
    <NextLink href="/login">
      <Link>
        <Button
          display={{ base: "none", md: "inline-flex" }}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"pink.400"}
          href={"#"}
          _hover={{
            bg: "pink.300"
          }}
        >
          Sign In
        </Button>
      </Link>
    </NextLink>
  );

  const viewerMenu = (
    <Menu>
      <MenuButton>
        <Avatar src={viewer.avatar} />
      </MenuButton>
      <MenuList>
        <Link href="/user/settings">
          <MenuItem>
            <Box mr={2}>
              <SettingsIcon w={5} h={5} />
            </Box>
            <span>Settings</span>
          </MenuItem>
        </Link>

        <MenuItem>
          <Link href="/user/select-mode">
            <span>Select Mode</span>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <span>Log Out</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );

  const mobileMenu = (
    <Flex
      flexDir={["row", "column"]}
      justifyContent={["space-between", "flex-start"]}
      alignItems="center"
      width={["100%", "100px"]}
      position={["static", "absolute"]}
      top="100px"
      my={[10, 0]}
      px={[5, 0]}
    >
      <Link href="/">
        <Box>
          <BiTimer size={40} />
        </Box>
      </Link>
      <Link href="/user/stats">
        <Box mt={[0, "3rem"]}>
          <BiStats size={40} />
        </Box>
      </Link>
      <Link href="/user/settings">
        <Box mt={[0, "3rem"]}>
          <VscSettingsGear size={40} />
        </Box>
      </Link>
    </Flex>
  );

  const menu = isAuthenticated ? viewerMenu : loginButton;
  return (
    <Box>
      <Flex alignItems="center">
        <Box p="2">
          <Link href="/">
            <Heading size="md">Ayurveda</Heading>
          </Link>
        </Box>
        <Spacer />
        <Box p="2">{menu}</Box>
      </Flex>
      {mobileMenu}
    </Box>
  );
};
