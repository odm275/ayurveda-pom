import NextLink from "next/link";
import { Flex, Link, FlexProps, Icon } from "@chakra-ui/react";
import { ReactText } from "react";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
export const NavItem = ({ href, icon, children, ...rest }: NavItemProps) => {
  return (
    <NextLink href={href}>
      <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white"
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white"
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};
