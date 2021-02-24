/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateTaskUserInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTasks
// ====================================================

export interface UpdateTasks_updateTasks {
  __typename: "Tasks";
  total: number;
}

export interface UpdateTasks {
  updateTasks: UpdateTasks_updateTasks;
}

export interface UpdateTasksVariables {
  input?: UpdateTaskUserInput | null;
}
