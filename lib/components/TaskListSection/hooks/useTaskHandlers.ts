// Tasks is the list of tasks.
// Index is the location of the task in the list.
// Task is the current task being iterated.

export function useTaskHandlers({ tasks, task, index }) {
  const addAmtTask = (prevTasks) => {
    const copyAllTasks = Array.from(tasks);
    const updatedTaskData = {
      ...task,
      amt: task.amt + 1
    };
    copyAllTasks.splice(index, 1, updatedTaskData);

    return copyAllTasks;
  };

  const removeAmtTask = (prevTasks) => {
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

  const deleteTask = (prevTasks) => {
    const copyAllTasks = Array.from(tasks);

    copyAllTasks.splice(index, 1);

    return copyAllTasks;
  };
  return {
    addAmtTask,
    removeAmtTask,
    deleteTask
  };
}
