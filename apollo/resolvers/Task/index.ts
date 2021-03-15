import { NextApiRequest } from 'next';
import { ObjectId } from 'mongodb';
import { IResolvers } from 'graphql-tools';
import { UpdateTasksArgs, TasksData } from './types';
import { Task, Database } from '../../../database/types';
import { authorize } from '@/apollo/utils/authorize';

const concatTasksToUser = async (db, viewer, newTasksDataIds) => {
  if (!viewer.tasks) {
    await db.users.findOneAndUpdate({ _id: viewer._id }, [
      {
        $set: {
          tasks: {
            $concatArrays: [{ $ifNull: ['$tasks', newTasksDataIds] }]
          }
        }
      }
    ]);
  } else {
    await db.users.findOneAndUpdate({ _id: viewer._id }, [
      { $set: { tasks: { $concatArrays: ['$tasks', newTasksDataIds] } } }
    ]);
  }
};

export const taskResolvers: IResolvers = {
  Mutation: {
    updateTasks: async (
      __root: undefined,
      { input }: UpdateTasksArgs,
      { db, req }: { db: Database; req: NextApiRequest }
    ): Promise<TasksData> => {
      console.log('updateTasks');

      const viewer = await authorize(db, req);
      console.log('viewer', viewer);

      if (!viewer) {
        throw new Error('Viewer cannot be found!');
      }

      // These are going be the new tasks

      const newTasks = input.tasks.map(({ title, amt }) => ({
        _id: new ObjectId(),
        title,
        amt,
        user: viewer._id,
        isNew: false,
        isFinished: true // Gotta make this come from the front end later
      }));

      // We can go ahead and create them

      const insertResult = await db.tasks.insertMany(newTasks);
      const newTasksDataIds = Object.values(insertResult['insertedIds']);

      // Merge new tasks with user's tasks.
      await concatTasksToUser(db, viewer, newTasksDataIds);

      return {
        result: newTasks,
        total: newTasks.length
      };
    },
    test: () => {
      console.log('test');
      return 'Task.test';
    }
  },
  Task: {
    id: (task: Task): string => {
      return task._id.toString();
    }
  }
};
