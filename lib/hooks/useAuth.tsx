import dayjs from "dayjs";
import { graphqlClient } from "@/apollo/graphql-request-client";
import { useUser, useCustomToast } from "@/lib/hooks";
import { useLogInMutation, useLogOutMutation } from "../generated";

interface UseAuth {
  login: () => Promise<void>;
  logout: () => void;
}

export function useAuth(): UseAuth {
  const SERVER_ERROR = "There was an error contacting the server.";
  const toast = useCustomToast();
  const { clearUser, updateUser } = useUser();
  const { mutate: loginMutation } = useLogInMutation(graphqlClient, {
    onSuccess: (data) => {
      if (data?.logIn) {
        toast({
          title: `Logged in as ${data.logIn.name}`,
          status: "info"
        });
        updateUser(data.logIn);
      }
    }
  });
  const { mutate: logoutMutation } = useLogOutMutation(graphqlClient, {
    onSuccess: (data) => {
      clearUser();
      toast({
        title: "Logged out!",
        status: "info"
      });
    }
  });

  async function login(): Promise<void> {
    const code = new URL(window.location.href).searchParams.get("code");
    const date = dayjs().format("MM-DD-YYYY");
    const today = dayjs().format("MM-DD-YYYY");
    if (code) {
      loginMutation({
        date: date,
        today: today,
        input: { code }
      });
    }
  }
  function logout(): void {
    logoutMutation({});
  }
  return {
    login,
    logout
  };
}
