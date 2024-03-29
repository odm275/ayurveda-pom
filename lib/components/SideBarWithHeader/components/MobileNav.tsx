import NextLink from "next/link";
import { useApolloClient, gql } from "@apollo/client";
import {
  FlexProps,
  Flex,
  IconButton,
  Text,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  Box,
  MenuList,
  useColorModeValue,
  MenuItem,
  MenuDivider,
  Link
} from "@chakra-ui/react";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { WindIcon } from "@/lib/components/WindIcon";
// import { initialViewer, useAuth } from "@/lib/context/AuthContext";
import {
  useLogInMutation,
  useLogOutMutation,
  useMeQuery
} from "@/lib/generated";
import {
  displayErrorNotification,
  displaySuccessNotification
} from "@/lib/utils/toast";
import { useUser, useAuth } from "@/lib/hooks";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { user } = useUser();
  const { logout } = useAuth();

  // const [logOut, { loading: loadingLogOut }] = useLogOutMutation({
  //   onCompleted: (data) => {
  //     if (data && data.logOut) {
  //       sessionStorage.removeItem("token");
  //       displaySuccessNotification(
  //         "You've succesfully logged out!",
  //         "Thank you"
  //       );
  //     }
  //   },
  //   onError: () => {
  //     displayErrorNotification(
  //       "Sorry! We weren't able to log you out. Please try again later!"
  //     );
  //   }
  // });

  const userAvatar = user ? (
    <Avatar name={user.name} size={"sm"} src={user.avatar} />
  ) : (
    <Avatar size={"sm"} />
  );

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <NextLink href="/user">
          <Link>
            <WindIcon />
          </Link>
        </NextLink>
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {userAvatar}
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                ></VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
