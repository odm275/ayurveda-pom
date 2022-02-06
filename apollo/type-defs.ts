import { gql } from "@apollo/client";
import { makeSchema } from "nexus";
import { join } from "path";
<<<<<<< HEAD
import * as types from "./schema";
import { User } from "./schema/User";

export const nexusSchema = makeSchema({
  types: [User],
=======
import path from "path";
import * as types from "./schema/index";

export const nexusSchema = makeSchema({
  types: [types],
>>>>>>> nexus-refactor
  outputs: {
    typegen: join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
    schema: join(process.cwd(), "apollo", "schema.graphql")
<<<<<<< HEAD
=======
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "apollo", "createContext.ts")
  },
  sourceTypes: {
    modules: [
      {
        module: path.join(process.cwd(), "/database/types.ts"),
        alias: "db"
      }
    ]
>>>>>>> nexus-refactor
  }
});

export const typeDefs = gql`
  "Different states the pomodoro can be in"
  enum PomCycle {
    POMODORO
    SHORTBREAK
    LONGBREAK
  }

  "How many Pomodoros got done for a day"
  type PomRecord {
    "date for record"
    date: String!
    "How many pomodoros happened that day"
    count: Int!
  }

  type PomData {
    "Total number of pomRecords"
    total: Int!
    "All the pomRecords for a User. Note: [PomRecord!]! might be incorrect"
    result: [PomRecord!]!
  }

  type Task {
    id: ID!
    "What the task is or can be named as"
    title: String!
    "Amt of pomodoros are going need to be done for this task to be considered finished"
    amt: Int!
    "User related to this task"
    user: String!
    "Whether the tasks was just created or already existed in the db"
    isNew: Boolean!
    "The amt of pomodoros is 0. Note: this might be a redundant field"
    isFinished: Boolean!
    "The Category the Task belongs to"
    category: String!
  }

  type Tasks {
    "The total number of tasks for a User"
    total: Int!
    "The total amt of tasks for a User"
    result: [Task!]!
  }

  type User {
    "Unique ID for the User"
    id: ID!
    "name of the User"
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
    "ID for a Viewer"
    id: ID
    token: String
    "User avatar(picture)"
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
    "Amount of pomodoros completed per day for a Viewer"
    pomData: PomData!
    "pomodoro Count for the current day"
    pomCount(date: String!): Int!
    "Tasks that aren't finished aka ongoing for the User"
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
