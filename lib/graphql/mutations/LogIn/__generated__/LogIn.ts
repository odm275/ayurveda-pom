/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LogInInput, PomCycle } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: LogIn
// ====================================================

export interface LogIn_logIn_tasks_result {
  __typename: "Task";
  id: string;
  title: string;
  amt: number;
  isNew: boolean;
  isFinished: boolean;
}

export interface LogIn_logIn_tasks {
  __typename: "Tasks";
  total: number;
  result: (LogIn_logIn_tasks_result | null)[];
}

export interface LogIn_logIn {
  __typename: "Viewer";
  id: string | null;
  token: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
  pomDuration: number | null;
  shortBreakDuration: number | null;
  longBreakDuration: number | null;
  longBreakInterval: number | null;
  pomCycle: PomCycle | null;
  pomCount: number | null;
  tasks: LogIn_logIn_tasks;
}

export interface LogIn {
  logIn: LogIn_logIn;
}

export interface LogInVariables {
  input?: LogInInput | null;
  date: string;
}
