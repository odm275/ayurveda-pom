export interface Viewer {
  id: string | null;
  token: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
  longBreakDuration: number | null;
  longBreakInterval: number | null;
  pomCount: number | null;
  pomCycle: string | null;
  pomDuration: string | null;
  shortBreakDuration: string | null;
  currentTasks: any;
  pomData: any;
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
