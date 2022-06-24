import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
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
  me: User;
  viewerCurrentTasks?: Maybe<Array<Maybe<Task>>>;
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
  id?: Maybe<Scalars['ID']>;
  /** Long break after a certain amt of pomodoro cycles are met */
  longBreakDuration?: Maybe<Scalars['Int']>;
  /** The amt of pomodoro cycles(pom,shortBreak) that have to happen before a long break */
  longBreakInterval?: Maybe<Scalars['Int']>;
  /** Name of the User */
  name?: Maybe<Scalars['String']>;
  /** Get the count for TODAY'S POM ENTRY */
  pomCount?: Maybe<Scalars['Int']>;
  /** Current cycle(shortbreak, longbreak, or pomodoro) */
  pomCycle?: Maybe<PomCycle>;
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


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'User', id?: string | null, name?: string | null, token?: string | null, avatar?: string | null, didRequest: boolean } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'User', didRequest: boolean } };

export type PomCycleUpdateMutationVariables = Exact<{
  input?: InputMaybe<PomCycleUpdateInput>;
}>;


export type PomCycleUpdateMutation = { __typename?: 'Mutation', pomCycleUpdate: { __typename?: 'User', id?: string | null } };

export type UpdateTasksPositionsMutationVariables = Exact<{
  input?: InputMaybe<UpdateTasksPositionsInput>;
}>;


export type UpdateTasksPositionsMutation = { __typename?: 'Mutation', updateTasksPositions: { __typename?: 'Tasks', tasks?: Array<{ __typename?: 'Task', id?: string | null } | null> | null } };

export type UpdateViewerDataMutationVariables = Exact<{
  input?: InputMaybe<UpdateViewerDataInput>;
}>;


export type UpdateViewerDataMutation = { __typename?: 'Mutation', updateViewerData: { __typename?: 'User', id?: string | null, longBreakInterval?: number | null, pomDuration?: number | null, shortBreakDuration?: number | null, longBreakDuration?: number | null } };

export type UpdateViewerSettingsMutationVariables = Exact<{
  input?: InputMaybe<UpdateViewerSettingsInput>;
}>;


export type UpdateViewerSettingsMutation = { __typename?: 'Mutation', updateViewerSettings: { __typename?: 'User', id?: string | null, longBreakInterval?: number | null, pomDuration?: number | null, shortBreakDuration?: number | null, longBreakDuration?: number | null } };

export type AuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUrlQuery = { __typename?: 'Query', authUrl: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id?: string | null, name?: string | null, token?: string | null, avatar?: string | null, didRequest: boolean } };

export type ViewerCurrentTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerCurrentTasksQuery = { __typename?: 'Query', viewerCurrentTasks?: Array<{ __typename?: 'Task', id?: string | null, amt?: number | null, title?: string | null, positionId?: number | null, userId?: string | null, eta?: any | null } | null> | null };

export type ViewerPomDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerPomDataQuery = { __typename?: 'Query', viewerPomData: { __typename?: 'User', pomDuration?: number | null, pomCycle?: PomCycle | null, shortBreakDuration?: number | null, longBreakDuration?: number | null, longBreakInterval?: number | null, didRequest: boolean, tasks: Array<{ __typename?: 'Task', id?: string | null, createdAt?: any | null, updatedAt?: any | null, title?: string | null, amt?: number | null, positionId?: number | null, userId?: string | null, eta?: any | null } | null> } };


export const CreateTaskDocument = `
    mutation createTask($input: CreateTaskInput) {
  createTask(input: $input) {
    title
    amt
    eta
    positionId
  }
}
    `;
export const useCreateTaskMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateTaskMutation, TError, CreateTaskMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateTaskMutation, TError, CreateTaskMutationVariables, TContext>(
      ['createTask'],
      (variables?: CreateTaskMutationVariables) => fetcher<CreateTaskMutation, CreateTaskMutationVariables>(client, CreateTaskDocument, variables, headers)(),
      options
    );
export const DeleteTaskDocument = `
    mutation deleteTask($input: DeleteTaskViewerInput) {
  deleteTask(input: $input) {
    id
    positionId
  }
}
    `;
export const useDeleteTaskMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteTaskMutation, TError, DeleteTaskMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteTaskMutation, TError, DeleteTaskMutationVariables, TContext>(
      ['deleteTask'],
      (variables?: DeleteTaskMutationVariables) => fetcher<DeleteTaskMutation, DeleteTaskMutationVariables>(client, DeleteTaskDocument, variables, headers)(),
      options
    );
export const LogInDocument = `
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
export const useLogInMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogInMutation, TError, LogInMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogInMutation, TError, LogInMutationVariables, TContext>(
      ['LogIn'],
      (variables?: LogInMutationVariables) => fetcher<LogInMutation, LogInMutationVariables>(client, LogInDocument, variables, headers)(),
      options
    );
export const LogOutDocument = `
    mutation LogOut {
  logOut {
    didRequest
  }
}
    `;
export const useLogOutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogOutMutation, TError, LogOutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogOutMutation, TError, LogOutMutationVariables, TContext>(
      ['LogOut'],
      (variables?: LogOutMutationVariables) => fetcher<LogOutMutation, LogOutMutationVariables>(client, LogOutDocument, variables, headers)(),
      options
    );
export const PomCycleUpdateDocument = `
    mutation pomCycleUpdate($input: PomCycleUpdateInput) {
  pomCycleUpdate(input: $input) {
    id
  }
}
    `;
export const usePomCycleUpdateMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<PomCycleUpdateMutation, TError, PomCycleUpdateMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<PomCycleUpdateMutation, TError, PomCycleUpdateMutationVariables, TContext>(
      ['pomCycleUpdate'],
      (variables?: PomCycleUpdateMutationVariables) => fetcher<PomCycleUpdateMutation, PomCycleUpdateMutationVariables>(client, PomCycleUpdateDocument, variables, headers)(),
      options
    );
export const UpdateTasksPositionsDocument = `
    mutation updateTasksPositions($input: UpdateTasksPositionsInput) {
  updateTasksPositions(input: $input) {
    tasks {
      id
    }
  }
}
    `;
export const useUpdateTasksPositionsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateTasksPositionsMutation, TError, UpdateTasksPositionsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateTasksPositionsMutation, TError, UpdateTasksPositionsMutationVariables, TContext>(
      ['updateTasksPositions'],
      (variables?: UpdateTasksPositionsMutationVariables) => fetcher<UpdateTasksPositionsMutation, UpdateTasksPositionsMutationVariables>(client, UpdateTasksPositionsDocument, variables, headers)(),
      options
    );
export const UpdateViewerDataDocument = `
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
export const useUpdateViewerDataMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateViewerDataMutation, TError, UpdateViewerDataMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateViewerDataMutation, TError, UpdateViewerDataMutationVariables, TContext>(
      ['UpdateViewerData'],
      (variables?: UpdateViewerDataMutationVariables) => fetcher<UpdateViewerDataMutation, UpdateViewerDataMutationVariables>(client, UpdateViewerDataDocument, variables, headers)(),
      options
    );
export const UpdateViewerSettingsDocument = `
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
export const useUpdateViewerSettingsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateViewerSettingsMutation, TError, UpdateViewerSettingsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateViewerSettingsMutation, TError, UpdateViewerSettingsMutationVariables, TContext>(
      ['UpdateViewerSettings'],
      (variables?: UpdateViewerSettingsMutationVariables) => fetcher<UpdateViewerSettingsMutation, UpdateViewerSettingsMutationVariables>(client, UpdateViewerSettingsDocument, variables, headers)(),
      options
    );
export const AuthUrlDocument = `
    query AuthUrl {
  authUrl
}
    `;
export const useAuthUrlQuery = <
      TData = AuthUrlQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: AuthUrlQueryVariables,
      options?: UseQueryOptions<AuthUrlQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AuthUrlQuery, TError, TData>(
      variables === undefined ? ['AuthUrl'] : ['AuthUrl', variables],
      fetcher<AuthUrlQuery, AuthUrlQueryVariables>(client, AuthUrlDocument, variables, headers),
      options
    );
export const MeDocument = `
    query Me {
  me {
    id
    name
    token
    avatar
    didRequest
  }
}
    `;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['Me'] : ['Me', variables],
      fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
      options
    );
export const ViewerCurrentTasksDocument = `
    query viewerCurrentTasks {
  viewerCurrentTasks {
    id
    amt
    title
    positionId
    userId
    eta
  }
}
    `;
export const useViewerCurrentTasksQuery = <
      TData = ViewerCurrentTasksQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ViewerCurrentTasksQueryVariables,
      options?: UseQueryOptions<ViewerCurrentTasksQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ViewerCurrentTasksQuery, TError, TData>(
      variables === undefined ? ['viewerCurrentTasks'] : ['viewerCurrentTasks', variables],
      fetcher<ViewerCurrentTasksQuery, ViewerCurrentTasksQueryVariables>(client, ViewerCurrentTasksDocument, variables, headers),
      options
    );
export const ViewerPomDataDocument = `
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
export const useViewerPomDataQuery = <
      TData = ViewerPomDataQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ViewerPomDataQueryVariables,
      options?: UseQueryOptions<ViewerPomDataQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ViewerPomDataQuery, TError, TData>(
      variables === undefined ? ['viewerPomData'] : ['viewerPomData', variables],
      fetcher<ViewerPomDataQuery, ViewerPomDataQueryVariables>(client, ViewerPomDataDocument, variables, headers),
      options
    );