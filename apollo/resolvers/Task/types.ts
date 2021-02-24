import { Task } from '@/database/types';

export interface TasksData {
  total: number;
  result: Task[];
}

export interface TasksInput {
  title: string;
  amt: number;
  category: string;
  eta: string;
  new: boolean;
}

export interface UpdateTasksInput {
  tasks: [Task];
}

export interface UpdateTasksArgs {
  input: UpdateTasksInput;
}
