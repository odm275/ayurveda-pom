import { Button } from "@chakra-ui/react";
import GoogleLogo from "../../../../public/btn_google_light_normal_ios.svg";

export const LogInGoogleButton = ({ onClick }) => (
  <Button
    my="10"
    background="#4285f4"
    pl={0}
    py={6}
    onClick={onClick}
    leftIcon={<GoogleLogo />}
    borderRadius={3}
  >
    Sign in with Google
  </Button>
);