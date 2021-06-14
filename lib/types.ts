import {
  LogIn_logIn_currentTasks,
  LogIn_logIn_pomData
} from './graphql/mutations/LogIn/__generated__/LogIn';
enum PomCycle {
  LONGBREAK = 'LONGBREAK',
  POMODORO = 'POMODORO',
  SHORTBREAK = 'SHORTBREAK'
}
export interface Viewer {
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

export interface Task {
  id: string | null;
  amt: number | null;
  eta: string | null;
  isNew: boolean | null;
}

export interface TaskType {
  title: string | null;
  amt: number | null;
  eta: string | null;
  isNew: boolean | null;
  isFinished: boolean | null;
  positionId: number;
}

interface PomEntry {
  date: string;
  count: number;
}

export interface PomData {
  result: PomEntry[];
  count?: number;
}
