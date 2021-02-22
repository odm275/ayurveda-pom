export interface Task {
  title: string;
  amt: number;
}

export interface CreateTaskInput {
  tasks: [Task];
}

export interface CreateTaskArgs {
  input: CreateTaskInput;
}
