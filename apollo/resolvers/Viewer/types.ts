import { Task } from '@/database/types';

export interface LogInArgs {
  input: { code: string } | null;
  date: string | null;
}

export enum PomCycle {
  Pomodoro = 'POMODORO',
  ShortBreak = 'SHORTBREAK',
  LongBreak = 'LONGBREAK'
}

export interface UpdateUserSettingsArgs {
  input: {
    pomDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    longBreaknumbererval: number;
    pomCycle: PomCycle;
    date: string;
  } | null;
}

export interface UserPomCountArgs {
  date: string;
}

export interface ViewerTasksData {
  total: number;
  result: Task[];
}

export interface PomEntry {
  date: string;
  count: number;
}

export interface PomData {
  result: PomEntry[];
  count: number;
}
