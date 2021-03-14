import {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
  FunctionComponent
} from 'react';

import { useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { LOG_IN } from '../graphql/mutations';
import {
  LogIn as LogInData,
  LogInVariables
} from '../graphql/mutations/LogIn/__generated__/LogIn';
import { Viewer } from '../types';

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const authContext = createContext(null);

export const ProvideAuth: FunctionComponent = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  console.log('viewer', viewer);

  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem('token', data.logIn.token);
        } else {
          sessionStorage.removeItem('token');
        }
      }
    }
  });
  const logInRef = useRef(logIn);

  useEffect(() => {
    // logInRef.current();
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
