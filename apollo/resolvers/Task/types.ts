import { Task } from '@/database/types';

export interface TasksData {
  total: number;
  result: Task[];
}

export interface TasksInput {
  title: string;
  amt: number;
  isNew: boolean;
  isFinished: boolean;
}

export interface UpdateTasksInput {
  tasks: [Task];
}

export interface UpdateTasksArgs {
  input: UpdateTasksInput;
}
