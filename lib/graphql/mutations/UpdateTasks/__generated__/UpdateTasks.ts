/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateTaskUserInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTasks
// ====================================================

export interface UpdateTasks_updateTasks_result {
  __typename: "Task";
  id: string;
}

export interface UpdateTasks_updateTasks {
  __typename: "Tasks";
  total: number;
  result: UpdateTasks_updateTasks_result[];
}

export interface UpdateTasks {
  updateTasks: UpdateTasks_updateTasks;
}

export interface UpdateTasksVariables {
  input?: UpdateTaskUserInput | null;
}
