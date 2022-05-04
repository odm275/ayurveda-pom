import {
  createContext,
  useState,
  useEffect,
  useRef,
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
  pomEntry: [],
  tasks: [],
  token: null
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

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [viewer, setViewer] = useState<User>(initialViewer);

  const [logIn, { error, loading }] = useLogInMutation({
    onCompleted: (data) => {
      if (data && data.logIn) {
        console.log(data.logIn);
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

  const logInRef = useRef(logIn);
  const isAuthenticated = !!viewer.id && viewer.id !== null;

  useEffect(() => {
    if (!isAuthenticated) {
      logInRef.current({
        variables: {
          date: dayjs().format("MM-DD-YYYY")
        }
      });
    }
  }, []);

  return {
    isAuthenticated,
    viewer,
    setViewer,
    error,
    loading
  };
}
