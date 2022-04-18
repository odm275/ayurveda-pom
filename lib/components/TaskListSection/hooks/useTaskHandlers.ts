// Tasks is the list of tasks.
// Index is the location of the task in the list.
// Task is the current task being iterated.

export function useTaskHandlers() {
  const addAmtTask = (tasks, task, index) => (prevTasks) => {
    const copyAllTasks = Array.from(tasks);
    const updatedTaskData = {
      ...task,
      amt: task.amt + 1
    };
    copyAllTasks.splice(index, 1, updatedTaskData);

    return copyAllTasks;
  };

  const removeAmtTask = (tasks, task, index) => (prevTasks) => {
    const copyAllTasks = Array.from(tasks);
    const newAmt = task.amt - 1;

    const updatedTaskData = {
      ...task,
      amt: task.amt - 1,
      isFinished: newAmt < 1
    };
    copyAllTasks.splice(index, 1, updatedTaskData);

    return copyAllTasks;
  };

  const deleteTask = (task) => (prevTasks) => {
    const copyAllTasks = Array.from(prevTasks);

    copyAllTasks.splice(task.positionId, 1);

    return copyAllTasks;
  };
  return {
    addAmtTask,
    removeAmtTask,
    deleteTask
  };
}
