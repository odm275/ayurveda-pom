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
} from 'react';

import { ApolloError, useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { LOG_IN } from '../graphql/mutations';
import {
  LogIn as LogInData,
  LogInVariables
} from '../graphql/mutations/LogIn/__generated__/LogIn';
import { Viewer } from '../types';

const initialViewer: Viewer = {
  avatar:
    'https://lh3.googleusercontent.com/a-/AOh14GgON61oEh2hXDeGJ_uTAyUrzbfA_3iE_aDJH15SKQ=s100',
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

  const [logIn, { data, error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem('token', data.logIn.token);
        } else {
          sessionStorage.removeItem('token');
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
          date: dayjs().format('MM-DD-YYYY')
        }
      });
  }, []);

  return {
    viewer,
    setViewer,
    error
  };
}
