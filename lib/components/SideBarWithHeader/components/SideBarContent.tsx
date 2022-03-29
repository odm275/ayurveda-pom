import NextLink from "next/link";
import {
  Link,
  Box,
  useColorModeValue,
  Flex,
  CloseButton,
  BoxProps
} from "@chakra-ui/react";

import { FiHome, FiTrendingUp, FiSettings } from "react-icons/fi";

import { IconType } from "react-icons";

import { NavItem } from "./components";
import { WindIcon } from "@/lib/components/WindIcon";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/user" },
  { name: "Stats", icon: FiTrendingUp, href: "user/stats" },
  { name: "Settings", icon: FiSettings, href: "user/settings" }
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <NextLink href="/user">
          <Link>
            <WindIcon />
          </Link>
        </NextLink>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
