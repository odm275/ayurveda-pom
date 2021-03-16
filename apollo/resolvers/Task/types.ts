import { Task } from '@/database/types';

export interface TasksData {
  total: number;
  result: Task[];
}

export interface TasksInput {
  id: string;
  title: string;
  amt: number;
  isNew: boolean;
  isFinished: boolean;
}

export interface UpdateTasksInput {
  tasks: [TasksInput];
}

export interface UpdateTasksArgs {
  input: UpdateTasksInput;
}
