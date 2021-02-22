import { NextApiRequest } from 'next';
import { ObjectId } from 'mongodb';

import { CreateTaskArgs } from './types';
import { Task, Database } from '../../../database/types';
import { authorize } from '@/apollo/utils/authorize';

/* 
  Creating Tasks:
   - We are going to take new tasks in the playload.
   - We are going create new tasks from the payload.
  Sorting Tasks:
   - Tasks are going have a sortingId
   - When querying for today's tasks, we're going query and order by the sorting Id.

*/

export const taskResolver = {
  Mutation: {
    createTask: async (
      _root: undefined,
      { input }: CreateTaskArgs,
      { db, req }: { db: Database; req: NextApiRequest }
    ): Promise<Task> => {
      const viewer = await authorize(db, req);

      if (!viewer) {
        throw new Error('Viewer cannot be found!');
      }

      // These are going be the new tasks
      console.log('input tasks', input.tasks);

      const newTasks = input.tasks.map(({ title, amt }) => ({
        title,
        amt,
        user: viewer._id,
        new: false
      }));

      // We can go ahead and create them

      const insertResult = await db.tasks.insertMany(newTasks);

      const newTasksData = insertResult.ops[0];
      // Updated User Id

      await db.users.updateOne(
        {
          _id: viewer._id
        },
        {
          $push: { tasks: newTask._id }
        }
      );

      return newTask;
    }
  },
  Task: {
    id: (task: Task): string => {
      return task._id.toString();
    }
  }
};
