import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type CreateTaskInput = {
  amt?: InputMaybe<Scalars['Int']>;
  eta?: InputMaybe<Scalars['String']>;
  positionId?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type DeleteTaskViewerInput = {
  id: Scalars['String'];
};

export type LogInInput = {
  code: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  deleteTask: Task;
  logIn: User;
  logOut: User;
  /**  Updates data that needs to be update whenever a pomodoro Cycle complates. */
  pomCycleUpdate: User;
  updateTasksPositions: Tasks;
  /** Updates Viewer in database when a pomodoro counter goes up or when settings change. */
  updateViewerData: User;
  /** Update when Viewer Settings change */
  updateViewerSettings: User;
};


export type MutationCreateTaskArgs = {
  input?: InputMaybe<CreateTaskInput>;
};


export type MutationDeleteTaskArgs = {
  input?: InputMaybe<DeleteTaskViewerInput>;
};


export type MutationLogInArgs = {
  date?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<LogInInput>;
  today?: InputMaybe<Scalars['String']>;
};


export type MutationPomCycleUpdateArgs = {
  input?: InputMaybe<PomCycleUpdateInput>;
};


export type MutationUpdateTasksPositionsArgs = {
  input?: InputMaybe<UpdateTasksPositionsInput>;
};


export type MutationUpdateViewerDataArgs = {
  input?: InputMaybe<UpdateViewerDataInput>;
};


export type MutationUpdateViewerSettingsArgs = {
  input?: InputMaybe<UpdateViewerSettingsInput>;
};

export type PomCycleUpdateInput = {
  date?: InputMaybe<Scalars['String']>;
  increasePomCounter?: InputMaybe<Scalars['Boolean']>;
  pomCycle?: InputMaybe<PomCycle>;
};

export type PomEntry = {
  __typename?: 'PomEntry';
  count?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  authUrl: Scalars['String'];
  viewerCurrentTasks: Tasks;
  viewerPomData: User;
};

export type Task = {
  __typename?: 'Task';
  amt?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  eta?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  positionId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['String']>;
};

export type TaskId = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Tasks = {
  __typename?: 'Tasks';
  tasks?: Maybe<Array<Maybe<Task>>>;
};

export type UpdateTasksPositionsInput = {
  taskIds?: InputMaybe<Array<InputMaybe<TaskId>>>;
};

export type UpdateViewerDataInput = {
  date?: InputMaybe<Scalars['String']>;
  increasePomCounter?: InputMaybe<Scalars['Boolean']>;
  longBreakDuration?: InputMaybe<Scalars['Int']>;
  longBreakInterval?: InputMaybe<Scalars['Int']>;
  pomCycle?: InputMaybe<PomCycle>;
  pomDuration?: InputMaybe<Scalars['Int']>;
  shortBreakDuration?: InputMaybe<Scalars['Int']>;
};

export type UpdateViewerSettingsInput = {
  longBreakDuration?: InputMaybe<Scalars['Int']>;
  longBreakInterval?: InputMaybe<Scalars['Int']>;
  pomDuration?: InputMaybe<Scalars['Int']>;
  shortBreakDuration?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  /** User avatar(picture) */
  avatar?: Maybe<Scalars['String']>;
  /** (not a db field) Confirmation that the user's request came back to the client */
  didRequest: Scalars['Boolean'];
  /** Unique ID for the User */
  id: Scalars['ID'];
  /** Long break after a certain amt of pomodoro cycles are met */
  longBreakDuration?: Maybe<Scalars['Int']>;
  /** The amt of pomodoro cycles(pom,shortBreak) that have to happen before a long break */
  longBreakInterval?: Maybe<Scalars['Int']>;
  /** Name of the User */
  name: Scalars['String'];
  /** Get the count for TODAY'S POM ENTRY */
  pomCount?: Maybe<Scalars['Int']>;
  /** Current cycle(shortbreak, longbreak, or pomodoro) */
  pomCycle: PomCycle;
  /** Generic duration for pomodoro */
  pomDuration?: Maybe<Scalars['Int']>;
  /** All the Pom Entries for all time. As in, all the work ever done counted */
  pomEntry?: Maybe<PomEntry>;
  /** Short break after pomodoro */
  shortBreakDuration?: Maybe<Scalars['Int']>;
  /** All tasks for an User */
  tasks: Array<Maybe<Task>>;
  token?: Maybe<Scalars['String']>;
};


export type UserPomCountArgs = {
  today: Scalars['String'];
};


export type UserPomEntryArgs = {
  date: Scalars['String'];
};

export enum PomCycle {
  Longbreak = 'LONGBREAK',
  Pomodoro = 'POMODORO',
  Shortbreak = 'SHORTBREAK'
}

export type CreateTaskMutationVariables = Exact<{
  input?: InputMaybe<CreateTaskInput>;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', title?: string | null, amt?: number | null, eta?: any | null, positionId?: number | null } };

export type DeleteTaskMutationVariables = Exact<{
  input?: InputMaybe<DeleteTaskViewerInput>;
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: { __typename?: 'Task', id?: string | null, positionId?: number | null } };

export type LogInMutationVariables = Exact<{
  input?: InputMaybe<LogInInput>;
  date: Scalars['String'];
  today: Scalars['String'];
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'User', id: string, name: string, token?: string | null, avatar?: string | null, didRequest: boolean } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'User', id: string, token?: string | null, avatar?: string | null, didRequest: boolean } };

export type PomCycleUpdateMutationVariables = Exact<{
  input?: InputMaybe<PomCycleUpdateInput>;
}>;


export type PomCycleUpdateMutation = { __typename?: 'Mutation', pomCycleUpdate: { __typename?: 'User', id: string } };

export type UpdateTasksPositionsMutationVariables = Exact<{
  input?: InputMaybe<UpdateTasksPositionsInput>;
}>;


export type UpdateTasksPositionsMutation = { __typename?: 'Mutation', updateTasksPositions: { __typename?: 'Tasks', tasks?: Array<{ __typename?: 'Task', id?: string | null } | null> | null } };

export type UpdateViewerDataMutationVariables = Exact<{
  input?: InputMaybe<UpdateViewerDataInput>;
}>;


export type UpdateViewerDataMutation = { __typename?: 'Mutation', updateViewerData: { __typename?: 'User', id: string, longBreakInterval?: number | null, pomDuration?: number | null, shortBreakDuration?: number | null, longBreakDuration?: number | null } };

export type UpdateViewerSettingsMutationVariables = Exact<{
  input?: InputMaybe<UpdateViewerSettingsInput>;
}>;


export type UpdateViewerSettingsMutation = { __typename?: 'Mutation', updateViewerSettings: { __typename?: 'User', id: string, longBreakInterval?: number | null, pomDuration?: number | null, shortBreakDuration?: number | null, longBreakDuration?: number | null } };

export type AuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUrlQuery = { __typename?: 'Query', authUrl: string };

export type ViewerCurrentTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerCurrentTasksQuery = { __typename?: 'Query', viewerCurrentTasks: { __typename?: 'Tasks', tasks?: Array<{ __typename?: 'Task', id?: string | null, createdAt?: any | null, title?: string | null, amt?: number | null, positionId?: number | null, eta?: any | null } | null> | null } };

export type ViewerPomDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerPomDataQuery = { __typename?: 'Query', viewerPomData: { __typename?: 'User', pomDuration?: number | null, pomCycle: PomCycle, shortBreakDuration?: number | null, longBreakDuration?: number | null, longBreakInterval?: number | null, didRequest: boolean, tasks: Array<{ __typename?: 'Task', id?: string | null, createdAt?: any | null, updatedAt?: any | null, title?: string | null, amt?: number | null, positionId?: number | null, userId?: string | null, eta?: any | null } | null> } };


export const CreateTaskDocument = gql`
    mutation createTask($input: CreateTaskInput) {
  createTask(input: $input) {
    title
    amt
    eta
    positionId
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation deleteTask($input: DeleteTaskViewerInput) {
  deleteTask(input: $input) {
    id
    positionId
  }
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const LogInDocument = gql`
    mutation LogIn($input: LogInInput, $date: String!, $today: String!) {
  logIn(input: $input, date: $date, today: $today) {
    id
    name
    token
    avatar
    didRequest
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
 *      today: // value for 'today'
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
export const PomCycleUpdateDocument = gql`
    mutation pomCycleUpdate($input: PomCycleUpdateInput) {
  pomCycleUpdate(input: $input) {
    id
  }
}
    `;
export type PomCycleUpdateMutationFn = Apollo.MutationFunction<PomCycleUpdateMutation, PomCycleUpdateMutationVariables>;

/**
 * __usePomCycleUpdateMutation__
 *
 * To run a mutation, you first call `usePomCycleUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePomCycleUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pomCycleUpdateMutation, { data, loading, error }] = usePomCycleUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePomCycleUpdateMutation(baseOptions?: Apollo.MutationHookOptions<PomCycleUpdateMutation, PomCycleUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PomCycleUpdateMutation, PomCycleUpdateMutationVariables>(PomCycleUpdateDocument, options);
      }
export type PomCycleUpdateMutationHookResult = ReturnType<typeof usePomCycleUpdateMutation>;
export type PomCycleUpdateMutationResult = Apollo.MutationResult<PomCycleUpdateMutation>;
export type PomCycleUpdateMutationOptions = Apollo.BaseMutationOptions<PomCycleUpdateMutation, PomCycleUpdateMutationVariables>;
export const UpdateTasksPositionsDocument = gql`
    mutation updateTasksPositions($input: UpdateTasksPositionsInput) {
  updateTasksPositions(input: $input) {
    tasks {
      id
    }
  }
}
    `;
export type UpdateTasksPositionsMutationFn = Apollo.MutationFunction<UpdateTasksPositionsMutation, UpdateTasksPositionsMutationVariables>;

/**
 * __useUpdateTasksPositionsMutation__
 *
 * To run a mutation, you first call `useUpdateTasksPositionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTasksPositionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTasksPositionsMutation, { data, loading, error }] = useUpdateTasksPositionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTasksPositionsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTasksPositionsMutation, UpdateTasksPositionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTasksPositionsMutation, UpdateTasksPositionsMutationVariables>(UpdateTasksPositionsDocument, options);
      }
export type UpdateTasksPositionsMutationHookResult = ReturnType<typeof useUpdateTasksPositionsMutation>;
export type UpdateTasksPositionsMutationResult = Apollo.MutationResult<UpdateTasksPositionsMutation>;
export type UpdateTasksPositionsMutationOptions = Apollo.BaseMutationOptions<UpdateTasksPositionsMutation, UpdateTasksPositionsMutationVariables>;
export const UpdateViewerDataDocument = gql`
    mutation UpdateViewerData($input: UpdateViewerDataInput) {
  updateViewerData(input: $input) {
    id
    longBreakInterval
    pomDuration
    shortBreakDuration
    longBreakDuration
  }
}
    `;
export type UpdateViewerDataMutationFn = Apollo.MutationFunction<UpdateViewerDataMutation, UpdateViewerDataMutationVariables>;

/**
 * __useUpdateViewerDataMutation__
 *
 * To run a mutation, you first call `useUpdateViewerDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateViewerDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateViewerDataMutation, { data, loading, error }] = useUpdateViewerDataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateViewerDataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateViewerDataMutation, UpdateViewerDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateViewerDataMutation, UpdateViewerDataMutationVariables>(UpdateViewerDataDocument, options);
      }
export type UpdateViewerDataMutationHookResult = ReturnType<typeof useUpdateViewerDataMutation>;
export type UpdateViewerDataMutationResult = Apollo.MutationResult<UpdateViewerDataMutation>;
export type UpdateViewerDataMutationOptions = Apollo.BaseMutationOptions<UpdateViewerDataMutation, UpdateViewerDataMutationVariables>;
export const UpdateViewerSettingsDocument = gql`
    mutation UpdateViewerSettings($input: UpdateViewerSettingsInput) {
  updateViewerSettings(input: $input) {
    id
    longBreakInterval
    pomDuration
    shortBreakDuration
    longBreakDuration
  }
}
    `;
export type UpdateViewerSettingsMutationFn = Apollo.MutationFunction<UpdateViewerSettingsMutation, UpdateViewerSettingsMutationVariables>;

/**
 * __useUpdateViewerSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateViewerSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateViewerSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateViewerSettingsMutation, { data, loading, error }] = useUpdateViewerSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateViewerSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateViewerSettingsMutation, UpdateViewerSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateViewerSettingsMutation, UpdateViewerSettingsMutationVariables>(UpdateViewerSettingsDocument, options);
      }
export type UpdateViewerSettingsMutationHookResult = ReturnType<typeof useUpdateViewerSettingsMutation>;
export type UpdateViewerSettingsMutationResult = Apollo.MutationResult<UpdateViewerSettingsMutation>;
export type UpdateViewerSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateViewerSettingsMutation, UpdateViewerSettingsMutationVariables>;
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
export const ViewerCurrentTasksDocument = gql`
    query viewerCurrentTasks {
  viewerCurrentTasks {
    tasks {
      id
      createdAt
      title
      amt
      positionId
      eta
    }
  }
}
    `;

/**
 * __useViewerCurrentTasksQuery__
 *
 * To run a query within a React component, call `useViewerCurrentTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerCurrentTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerCurrentTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerCurrentTasksQuery(baseOptions?: Apollo.QueryHookOptions<ViewerCurrentTasksQuery, ViewerCurrentTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewerCurrentTasksQuery, ViewerCurrentTasksQueryVariables>(ViewerCurrentTasksDocument, options);
      }
export function useViewerCurrentTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewerCurrentTasksQuery, ViewerCurrentTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewerCurrentTasksQuery, ViewerCurrentTasksQueryVariables>(ViewerCurrentTasksDocument, options);
        }
export type ViewerCurrentTasksQueryHookResult = ReturnType<typeof useViewerCurrentTasksQuery>;
export type ViewerCurrentTasksLazyQueryHookResult = ReturnType<typeof useViewerCurrentTasksLazyQuery>;
export type ViewerCurrentTasksQueryResult = Apollo.QueryResult<ViewerCurrentTasksQuery, ViewerCurrentTasksQueryVariables>;
export const ViewerPomDataDocument = gql`
    query viewerPomData {
  viewerPomData {
    pomDuration
    pomCycle
    shortBreakDuration
    longBreakDuration
    longBreakInterval
    didRequest
    tasks {
      id
      createdAt
      updatedAt
      title
      amt
      positionId
      userId
      eta
    }
  }
}
    `;

/**
 * __useViewerPomDataQuery__
 *
 * To run a query within a React component, call `useViewerPomDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerPomDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerPomDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerPomDataQuery(baseOptions?: Apollo.QueryHookOptions<ViewerPomDataQuery, ViewerPomDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewerPomDataQuery, ViewerPomDataQueryVariables>(ViewerPomDataDocument, options);
      }
export function useViewerPomDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewerPomDataQuery, ViewerPomDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewerPomDataQuery, ViewerPomDataQueryVariables>(ViewerPomDataDocument, options);
        }
export type ViewerPomDataQueryHookResult = ReturnType<typeof useViewerPomDataQuery>;
export type ViewerPomDataLazyQueryHookResult = ReturnType<typeof useViewerPomDataLazyQuery>;
export type ViewerPomDataQueryResult = Apollo.QueryResult<ViewerPomDataQuery, ViewerPomDataQueryVariables>;


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateTaskInput: CreateTaskInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteTaskViewerInput: DeleteTaskViewerInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LogInInput: LogInInput;
  Mutation: ResolverTypeWrapper<{}>;
  PomCycleUpdateInput: PomCycleUpdateInput;
  PomEntry: ResolverTypeWrapper<PomEntry>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Task: ResolverTypeWrapper<Task>;
  TaskId: TaskId;
  Tasks: ResolverTypeWrapper<Tasks>;
  UpdateTasksPositionsInput: UpdateTasksPositionsInput;
  UpdateViewerDataInput: UpdateViewerDataInput;
  UpdateViewerSettingsInput: UpdateViewerSettingsInput;
  User: ResolverTypeWrapper<User>;
  pomCycle: PomCycle;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateTaskInput: CreateTaskInput;
  DateTime: Scalars['DateTime'];
  DeleteTaskViewerInput: DeleteTaskViewerInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LogInInput: LogInInput;
  Mutation: {};
  PomCycleUpdateInput: PomCycleUpdateInput;
  PomEntry: PomEntry;
  Query: {};
  String: Scalars['String'];
  Task: Task;
  TaskId: TaskId;
  Tasks: Tasks;
  UpdateTasksPositionsInput: UpdateTasksPositionsInput;
  UpdateViewerDataInput: UpdateViewerDataInput;
  UpdateViewerSettingsInput: UpdateViewerSettingsInput;
  User: User;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, Partial<MutationCreateTaskArgs>>;
  deleteTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, Partial<MutationDeleteTaskArgs>>;
  logIn?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationLogInArgs>>;
  logOut?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  pomCycleUpdate?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationPomCycleUpdateArgs>>;
  updateTasksPositions?: Resolver<ResolversTypes['Tasks'], ParentType, ContextType, Partial<MutationUpdateTasksPositionsArgs>>;
  updateViewerData?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationUpdateViewerDataArgs>>;
  updateViewerSettings?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationUpdateViewerSettingsArgs>>;
};

export type PomEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['PomEntry'] = ResolversParentTypes['PomEntry']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  authUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  viewerCurrentTasks?: Resolver<ResolversTypes['Tasks'], ParentType, ContextType>;
  viewerPomData?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  amt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  eta?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  positionId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TasksResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tasks'] = ResolversParentTypes['Tasks']> = {
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  didRequest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  longBreakDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  longBreakInterval?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pomCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<UserPomCountArgs, 'today'>>;
  pomCycle?: Resolver<ResolversTypes['pomCycle'], ParentType, ContextType>;
  pomDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pomEntry?: Resolver<Maybe<ResolversTypes['PomEntry']>, ParentType, ContextType, RequireFields<UserPomEntryArgs, 'date'>>;
  shortBreakDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tasks?: Resolver<Array<Maybe<ResolversTypes['Task']>>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PomEntry?: PomEntryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  Tasks?: TasksResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

