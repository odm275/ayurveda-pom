import { Task } from "@/lib/generated";

interface Params {
  tasks: [Task];
  index1: number;
  index2: number;
}

export function customSplice({ tasks, index1, index2 }: Params): Task[] {
  const copyTasks = [...tasks];
  if (index1 < index2) return copyTasks.splice(index1, index2 + 1);
  if (index2 < index1) return copyTasks.splice(index2, index1 + 1);
}
