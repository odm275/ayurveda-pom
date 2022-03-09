import React, { useState } from "react";
import Link from "next/link";
import {
  Flex,
  Box,
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
} from "@/lib/utils/index";
import { useLogOutMutation } from "../generated";

export const AppHeader = () => {
  const { viewer, setViewer } = useAuth();
  const [isOpen, setOpen] = useState(false);

  const [logOut] = useLogOutMutation({
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
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
    <Button colorScheme="teal">
      <Link href="/login">Login</Link>
    </Button>
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

  const menu = viewer.id && viewer.avatar ? viewerMenu : loginButton;
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
