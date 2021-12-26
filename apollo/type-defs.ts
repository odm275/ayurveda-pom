import { gql } from '@apollo/client';
export const typeDefs = gql`
  "Different states the pomodoro can be in"
  enum PomCycle {
    POMODORO
    SHORTBREAK
    LONGBREAK
  }


  type PomRecord {
    "date when the a successful pomodoro cycle finished"
    date: String!
    
    count: Int!
  }

  type PomData {
    total: Int!
    result: [PomRecord!]!
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
    result: [Task!]!
  }

  type User {
    id: ID!
    name: String!
    status: String!
    "Generic duration for pomodoro"
    pomDuration: Int
    "Short break after pomodoro"
    shortBreakDuration: Int
    "Long break after a certain amt of pomodoro cycles are met"
    longBreakDuration: Int
    "The amt of pomodoro cycles(pom,shortBreak) that have to happen before a long break"
    longBreakInterval: Int
    "enum for reference pomodoro cycles by a string name"
    pomCycle: PomCycle!
    "Tasks for today's date"
    tasks: [Task]!
  }


  type Viewer {
    id: ID
    token: String
    avatar: String
    "Resolve this as a boolean since we don't want the actual walletId to make it to the client"
    hasWallet: Boolean
    "Confirmation that the user's request came back to the client"
    didRequest: Boolean!
    "User properties that the Viewer also has"
    pomDuration: Int
    "User properties that the Viewer also has"
    shortBreakDuration: Int
    "User properties that the Viewer also has"
    longBreakDuration: Int
    "User properties that the Viewer also has"
    longBreakInterval: Int
    "User properties that the Viewer also has"
    pomCycle: PomCycle
    pomData: PomData!
    pomCount(date: String!): Int!
    currentTasks: Tasks!
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
    completeTasks: String!
  }

  type Mutation {
    logIn(input: LogInInput, date: String): Viewer!
    logOut: Viewer!
    "updates user in database when a pomodoro counter goes up, and when settings change"
    updateUserSettings(input: UpdateUserSettingsInput): Viewer!
    updateTasks(input: UpdateTaskUserInput): Tasks!
    test: String!
  }
`;
