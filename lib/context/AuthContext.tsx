import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  Dispatch,
  useCallback
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
      viewerHope: null | User;
    };

export const authContext = createContext<ContextValue>(undefined);

interface Props {
  children: ReactNode;
}

export const ProvideAuth: FunctionComponent = ({ children }: Props) => {
  const auth = useProvideAuth();
  const contextValue = useMemo(() => auth, [auth]);

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

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
  const viewerHope = loading || !viewer.id ? null : viewer;

  // If not authenticated -- try to log in
  const logInCallback = useCallback(logIn, []);
  useEffect(() => {
    if (!isAuthenticated) {
      logInCallback({
        variables: {
          date: dayjs().format("MM-DD-YYYY")
        }
      });
    }
  }, [logInCallback, viewer]);

  return {
    loading,
    isAuthenticated,
    viewer,
    setViewer,
    error,
    viewerHope
  };
}
