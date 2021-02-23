import { Task } from '@/database/types';

export interface TasksData {
  total: number;
  result: Task[];
}

export interface TaskInput {
  title: string;
  amt: number;
}

export interface CreateTaskInput {
  tasks: [Task];
}

export interface CreateTaskArgs {
  input: CreateTaskInput;
}
