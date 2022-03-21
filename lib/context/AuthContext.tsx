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

import { useLogInMutation, Viewer } from "../generated";

const initialViewer: Viewer = {
  avatar:
    "https://www.vectorstock.com/royalty-free-vector/avatar-icon-with-question-mark-symbol-with-male-vector-28785263",
  didRequest: false,
  hasWallet: null,
  id: null,
  longBreakDuration: null,
  longBreakInterval: null,
  pomCount: null,
  pomCycle: null,
  pomDuration: null,
  pomData: null,
  shortBreakDuration: null,
  currentTasks: null,
  token: null
};

export type ContextValue =
  | undefined
  | {
      viewer: Viewer;
      setViewer: Dispatch<SetStateAction<Viewer>>;
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
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  const [logIn, { data, error, loading }] = useLogInMutation({
    onCompleted: (data) => {
      if (data && data.logIn) {
        const newViewerObj = {
          ...viewer,
          ...data.logIn
        };

        console.log("newViewerObj", newViewerObj);
        setViewer(newViewerObj);

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

  useEffect(() => {
    logInRef.current({
      variables: {
        date: dayjs().format("MM-DD-YYYY")
      }
    });
  }, []);

  return {
    isAuthenticated: !!viewer.id,
    viewer,
    setViewer,
    error,
    loading
  };
}
