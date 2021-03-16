import { gql } from '@apollo/client';
export const typeDefs = gql`
  enum PomCycle {
    POMODORO
    SHORTBREAK
    LONGBREAK
  }

  type PomData {
    date: String!
    count: Int!
  }

  type Task {
    id: ID!
    title: String!
    amt: Int!
    user: String!
    isNew: Boolean!
    isFinished: Boolean!
  }

  type Tasks {
    total: Int!
    result: [Task]!
  }

  type User {
    id: ID!
    name: String!
    status: String!
    pomDuration: Int
    shortBreakDuration: Int
    longBreakDuration: Int
    longBreakInterval: Int
    pomCycle: PomCycle!
    pomData: [PomData]!
    todayTasks: [Task]!
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean # Resolve this as a boolean since we don't want the actual walletId to make it to the client
    didRequest: Boolean!
    pomDuration: Int
    shortBreakDuration: Int
    longBreakDuration: Int
    longBreakInterval: Int
    pomCycle: PomCycle
    pomCount(date: String!): Int
    tasks: Tasks!
  }

  input LogInInput {
    code: String!
  }

  input UpdateUserSettingsInput {
    pomDuration: Int
    shortBreakDuration: Int
    longBreakDuration: Int
    longBreakInterval: Int
    pomCycle: PomCycle
    date: String
  }

  input TaskInput {
    id: String
    title: String
    amt: Int
    eta: String
    isNew: Boolean
    isFinished: Boolean
  }

  input UpdateTaskUserInput {
    tasks: [TaskInput]!
  }

  type Query {
    viewer: User
    authUrl: String!
    tasks: Tasks!
  }

  type Mutation {
    logIn(input: LogInInput, date: String): Viewer!
    logOut: Viewer!
    updateUserSettings(input: UpdateUserSettingsInput): Viewer!
    updateTasks(input: UpdateTaskUserInput): Tasks!
    test: String!
  }
`;
