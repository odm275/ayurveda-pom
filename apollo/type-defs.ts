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
  }

  type Task {
    id: ID!
    title: String!
    amt: Int!
    user: String!
  }

  type Tasks {
    total: Int!
    result: [Tasks!]!
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

  input CreateTaskUserInput {
    title: String
    amt: Int
  }

  type Query {
    viewer: User
    authUrl: String!
  }

  type Mutation {
    logIn(input: LogInInput, date: String): Viewer!
    logOut: Viewer!
    updateUserSettings(input: UpdateUserSettingsInput): Viewer!
    createTasks(input: CreateTaskUserInput): Tasks!
  }
`;
