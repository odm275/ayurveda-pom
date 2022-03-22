import { Link } from "@chakra-ui/react";
import Image from "next/image";
import { default as NextLink } from "next/link";

export const BuyMeCoffeeButton = () => (
  <NextLink href="https://www.buymeacoffee.com/odm275">
    <Link>
      <Image
        src="/bmc-button.png"
        alt="Buy me Coffee Button"
        width="102px"
        height="40px"
      />
    </Link>
  </NextLink>
);
