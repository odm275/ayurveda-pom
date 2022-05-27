import {
  createContext,
  useState,
  useEffect,
  useContext,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  Dispatch
} from "react";

import { ApolloError } from "@apollo/client";
import dayjs from "dayjs";

import { useLogInMutation, User } from "../generated";

export const initialViewer: User = {
  __typename: "User",
  avatar:
    "https://www.vectorstock.com/royalty-free-vector/avatar-icon-with-question-mark-symbol-with-male-vector-28785263",
  didRequest: false,
  id: null,
  name: null,
  pomCycle: null,
  pomDuration: null,
  shortBreakDuration: null,
  longBreakDuration: null,
  longBreakInterval: null,
  pomEntry: null,
  tasks: [],
  token: null,
  pomCount: 0
};

export type ContextValue =
  | undefined
  | {
      viewer: User;
      setViewer: Dispatch<SetStateAction<User>>;
      error: ApolloError;
      loading: boolean;
      isAuthenticated: boolean;
    };

export const authContext = createContext<ContextValue>(undefined);

interface Props {
  children: ReactNode;
}

export const ProvideAuth: FunctionComponent = ({ children }: Props) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);

// State in this hook
// 1) { loading, error } state: loading true, loading false,
// 2) viewer state
// initial render + loading true + loading false + viewer state update = 4 renders.
// I hope I'm doing the math right ...

function useProvideAuth() {
  const [viewer, setViewer] = useState<User>(initialViewer);

  const [logIn, { loading, error }] = useLogInMutation({
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem("token", data.logIn.token);
        } else {
          sessionStorage.removeItem("token");
        }
      }
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const isAuthenticated = !!viewer.id && viewer.id !== null;

  useEffect(() => {
    if (!isAuthenticated) {
      logIn({
        variables: {
          date: dayjs().format("MM-DD-YYYY"),
          today: dayjs().format("MM-DD-YYYY")
        }
      });
    }
  }, [viewer, logIn]);

  return {
    viewer,
    loading,
    isAuthenticated,
    setViewer,
    error
  };
}
