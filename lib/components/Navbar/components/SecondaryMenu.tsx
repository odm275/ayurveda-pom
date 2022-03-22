import Image from "next/image";
import { default as NextLink } from "next/link";
import { Stack, Link, Button } from "@chakra-ui/react";

export const SecondaryMenu = () => (
  <Stack
    flex={{ base: 1, md: 0 }}
    justify={"flex-end"}
    direction={"row"}
    spacing={6}
  >
    <NextLink href="https://www.buymeacoffee.com/odm275">
      <Link display={{ base: "none", md: "inline-flex" }}>
        <Image
          src="/bmc-button.png"
          alt="Buy me Coffee Button"
          width="102px"
          height="40px"
        />
      </Link>
    </NextLink>
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
  </Stack>
);
