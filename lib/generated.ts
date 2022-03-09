import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LogInInput = {
  code: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logIn: Viewer;
  logOut: Viewer;
  updateTasks: Tasks;
  /** updates user in database when a pomodoro counter goes up, and when settings change */
  updateUserSettings: Viewer;
};


export type MutationLogInArgs = {
  date?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<LogInInput>;
};


export type MutationUpdateTasksArgs = {
  input?: InputMaybe<UpdateTaskUserInput>;
};


export type MutationUpdateUserSettingsArgs = {
  input?: InputMaybe<UpdateUserSettingsInput>;
};

export type PomData = {
  __typename?: 'PomData';
  /** All the pomRecords for a User. Note: [PomRecord!]! might be incorrect */
  result: Array<PomRecord>;
  /** Total number of pomRecords */
  total: Scalars['Int'];
};

/** How many Pomodoros got done for a day */
export type PomRecord = {
  __typename?: 'PomRecord';
  /** How many pomodoros happened that day */
  count: Scalars['Int'];
  /** date for record */
  date: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  authUrl: Scalars['String'];
};

export type Task = {
  __typename?: 'Task';
  amt?: Maybe<Scalars['Int']>;
  category?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isFinished?: Maybe<Scalars['Boolean']>;
  isNew?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type TaskInput = {
  amt?: InputMaybe<Scalars['Int']>;
  eta?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  isFinished?: InputMaybe<Scalars['Boolean']>;
  isNew?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Tasks = {
  __typename?: 'Tasks';
  /** The total amt of tasks for a User */
  result: Array<Task>;
  /** The total number of tasks for a User */
  total: Scalars['Int'];
};

export type UpdateTaskUserInput = {
  tasks: Array<InputMaybe<TaskInput>>;
};

export type UpdateUserSettingsInput = {
  date?: InputMaybe<Scalars['String']>;
  longBreakDuration?: InputMaybe<Scalars['Int']>;
  longBreakInterval?: InputMaybe<Scalars['Int']>;
  pomCycle?: InputMaybe<PomCycle>;
  pomDuration?: InputMaybe<Scalars['Int']>;
  shortBreakDuration?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  /** Unique ID for the User */
  id: Scalars['ID'];
  /** Long break after a certain amt of pomodoro cycles are met */
  longBreakDuration?: Maybe<Scalars['Int']>;
  /** The amt of pomodoro cycles(pom,shortBreak) that have to happen before a long break */
  longBreakInterval?: Maybe<Scalars['Int']>;
  /** name of the User */
  name: Scalars['String'];
  /** enum for reference pomodoro cycles by a string name */
  pomCycle: PomCycle;
  /** Generic duration for pomodoro */
  pomDuration?: Maybe<Scalars['Int']>;
  /** Short break after pomodoro */
  shortBreakDuration?: Maybe<Scalars['Int']>;
  status: Scalars['String'];
  /** Tasks for today's date */
  tasks: Array<Maybe<Task>>;
};

export type Viewer = {
  __typename?: 'Viewer';
  /** User avatar(picture) */
  avatar?: Maybe<Scalars['String']>;
  /** Tasks that aren't finished aka ongoing for the User */
  currentTasks: Tasks;
  /** Confirmation that the user's request came back to the client */
  didRequest: Scalars['Boolean'];
  /** Resolve this as a boolean since we don't want the actual walletId to make it to the client */
  hasWallet?: Maybe<Scalars['Boolean']>;
  /** ID for a Viewer */
  id?: Maybe<Scalars['ID']>;
  /** User properties that the Viewer also has */
  longBreakDuration?: Maybe<Scalars['Int']>;
  /** User properties that the Viewer also has */
  longBreakInterval?: Maybe<Scalars['Int']>;
  /** pomodoro Count for the current day */
  pomCount: Scalars['Int'];
  /** User properties that the Viewer also has */
  pomCycle?: Maybe<PomCycle>;
  /** Amount of pomodoros completed per day for a Viewer */
  pomData: PomData;
  /** User properties that the Viewer also has */
  pomDuration?: Maybe<Scalars['Int']>;
  /** User properties that the Viewer also has */
  shortBreakDuration?: Maybe<Scalars['Int']>;
  token?: Maybe<Scalars['String']>;
};


export type ViewerPomCountArgs = {
  date: Scalars['String'];
};

export enum PomCycle {
  Longbreak = 'LONGBREAK',
  Pomodoro = 'POMODORO',
  Shortbreak = 'SHORTBREAK'
}

export type LogInMutationVariables = Exact<{
  input?: InputMaybe<LogInInput>;
  date: Scalars['String'];
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, hasWallet?: boolean | null, didRequest: boolean, pomDuration?: number | null, shortBreakDuration?: number | null, longBreakDuration?: number | null, longBreakInterval?: number | null, pomCycle?: PomCycle | null, pomCount: number, pomData: { __typename?: 'PomData', result: Array<{ __typename?: 'PomRecord', date: string, count: number }> }, currentTasks: { __typename?: 'Tasks', total: number, result: Array<{ __typename?: 'Task', id?: string | null, title?: string | null, amt?: number | null, isNew?: boolean | null, isFinished?: boolean | null }> } } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, didRequest: boolean } };

export type UpdateTasksMutationVariables = Exact<{
  input?: InputMaybe<UpdateTaskUserInput>;
}>;


export type UpdateTasksMutation = { __typename?: 'Mutation', updateTasks: { __typename?: 'Tasks', total: number, result: Array<{ __typename?: 'Task', id?: string | null }> } };

export type UpdateUserSettingsMutationVariables = Exact<{
  input?: InputMaybe<UpdateUserSettingsInput>;
}>;


export type UpdateUserSettingsMutation = { __typename?: 'Mutation', updateUserSettings: { __typename?: 'Viewer', id?: string | null, longBreakInterval?: number | null, pomDuration?: number | null, shortBreakDuration?: number | null, longBreakDuration?: number | null } };

export type AuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUrlQuery = { __typename?: 'Query', authUrl: string };


export const LogInDocument = gql`
    mutation LogIn($input: LogInInput, $date: String!) {
  logIn(input: $input, date: $date) {
    id
    token
    avatar
    hasWallet
    didRequest
    pomDuration
    shortBreakDuration
    longBreakDuration
    longBreakInterval
    pomCycle
    pomCount(date: $date)
    pomData {
      result {
        date
        count
      }
    }
    currentTasks {
      total
      result {
        id
        title
        amt
        isNew
        isFinished
      }
    }
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      input: // value for 'input'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut {
    id
    token
    avatar
    didRequest
  }
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const UpdateTasksDocument = gql`
    mutation UpdateTasks($input: UpdateTaskUserInput) {
  updateTasks(input: $input) {
    total
    result {
      id
    }
  }
}
    `;
export type UpdateTasksMutationFn = Apollo.MutationFunction<UpdateTasksMutation, UpdateTasksMutationVariables>;

/**
 * __useUpdateTasksMutation__
 *
 * To run a mutation, you first call `useUpdateTasksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTasksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTasksMutation, { data, loading, error }] = useUpdateTasksMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTasksMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTasksMutation, UpdateTasksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTasksMutation, UpdateTasksMutationVariables>(UpdateTasksDocument, options);
      }
export type UpdateTasksMutationHookResult = ReturnType<typeof useUpdateTasksMutation>;
export type UpdateTasksMutationResult = Apollo.MutationResult<UpdateTasksMutation>;
export type UpdateTasksMutationOptions = Apollo.BaseMutationOptions<UpdateTasksMutation, UpdateTasksMutationVariables>;
export const UpdateUserSettingsDocument = gql`
    mutation UpdateUserSettings($input: UpdateUserSettingsInput) {
  updateUserSettings(input: $input) {
    id
    longBreakInterval
    pomDuration
    shortBreakDuration
    longBreakDuration
  }
}
    `;
export type UpdateUserSettingsMutationFn = Apollo.MutationFunction<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>;

/**
 * __useUpdateUserSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateUserSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserSettingsMutation, { data, loading, error }] = useUpdateUserSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>(UpdateUserSettingsDocument, options);
      }
export type UpdateUserSettingsMutationHookResult = ReturnType<typeof useUpdateUserSettingsMutation>;
export type UpdateUserSettingsMutationResult = Apollo.MutationResult<UpdateUserSettingsMutation>;
export type UpdateUserSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>;
export const AuthUrlDocument = gql`
    query AuthUrl {
  authUrl
}
    `;

/**
 * __useAuthUrlQuery__
 *
 * To run a query within a React component, call `useAuthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthUrlQuery(baseOptions?: Apollo.QueryHookOptions<AuthUrlQuery, AuthUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthUrlQuery, AuthUrlQueryVariables>(AuthUrlDocument, options);
      }
export function useAuthUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthUrlQuery, AuthUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthUrlQuery, AuthUrlQueryVariables>(AuthUrlDocument, options);
        }
export type AuthUrlQueryHookResult = ReturnType<typeof useAuthUrlQuery>;
export type AuthUrlLazyQueryHookResult = ReturnType<typeof useAuthUrlLazyQuery>;
export type AuthUrlQueryResult = Apollo.QueryResult<AuthUrlQuery, AuthUrlQueryVariables>;