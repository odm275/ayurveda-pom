/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PomCycle {
  LONGBREAK = "LONGBREAK",
  POMODORO = "POMODORO",
  SHORTBREAK = "SHORTBREAK",
}

export interface LogInInput {
  code: string;
}

export interface TaskInput {
  id?: string | null;
  title?: string | null;
  amt?: number | null;
  eta?: string | null;
  isNew?: boolean | null;
  isFinished?: boolean | null;
}

export interface UpdateTaskUserInput {
  tasks: (TaskInput | null)[];
}

export interface UpdateUserSettingsInput {
  pomDuration?: number | null;
  shortBreakDuration?: number | null;
  longBreakDuration?: number | null;
  longBreakInterval?: number | null;
  pomCycle?: PomCycle | null;
  date?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
