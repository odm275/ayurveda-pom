/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LogInInput, PomCycle } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: LogIn
// ====================================================

export interface LogIn_logIn_pomData_result {
  __typename: "PomRecord";
  date: string;
  count: number;
}

export interface LogIn_logIn_pomData {
  __typename: "PomData";
  result: LogIn_logIn_pomData_result[];
}

export interface LogIn_logIn_currentTasks_result {
  __typename: "Task";
  id: string;
  title: string;
  amt: number;
  isNew: boolean;
  isFinished: boolean;
}

export interface LogIn_logIn_currentTasks {
  __typename: "Tasks";
  total: number;
  result: LogIn_logIn_currentTasks_result[];
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
  pomCount: number;
  pomData: LogIn_logIn_pomData;
  currentTasks: LogIn_logIn_currentTasks;
}

export interface LogIn {
  logIn: LogIn_logIn;
}

export interface LogInVariables {
  input?: LogInInput | null;
  date: string;
}
