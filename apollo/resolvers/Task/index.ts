import { NextApiRequest } from 'next';
import { ObjectId } from 'mongodb';

import { UpdateTasksArgs, TasksData } from './types';
import { Task, Database } from '../../../database/types';
import { authorize } from '@/apollo/utils/authorize';

export const taskResolver = {
  Mutation: {
    updateTasks: async (
      _root: undefined,
      { input }: UpdateTasksArgs,
      { db, req }: { db: Database; req: NextApiRequest }
    ): Promise<TasksData> => {
      console.log('updateTasks');
      const viewer = await authorize(db, req);

      if (!viewer) {
        throw new Error('Viewer cannot be found!');
      }

      // These are going be the new tasks

      const newTasks = input.tasks.map(({ title, amt }) => ({
        _id: new ObjectId(),
        title,
        amt,
        user: viewer._id,
        isNew: false
      }));

      // We can go ahead and create them

      const insertResult = await db.tasks.insertMany(newTasks);
      const newTasksDataIds = Object.values(insertResult['insertedIds']);

      // Merge new tasks with user's tasks.

      await db.users.findOneAndUpdate({ _id: viewer._id }, [
        { $set: { tasks: { $concatArrays: ['$tasks', newTasksDataIds] } } }
      ]);

      return {
        result: newTasks,
        total: newTasks.length
      };
    }
  },
  Task: {
    id: (task: Task): string => {
      return task._id.toString();
    }
  }
};
