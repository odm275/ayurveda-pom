import { NextApiRequest } from 'next';
import { ObjectId } from 'mongodb';
import { IResolvers } from 'graphql-tools';
import { UpdateTasksArgs, TasksData } from './types';
import { Task, Database } from '../../../database/types';
import { authorize } from '@/apollo/utils/authorize';
import { position } from '@chakra-ui/react';

const concatTasksToUser = async (db, viewer, newTasksDataIds) => {
  if (!viewer.tasks) {
    const res = await db.users.findOneAndUpdate({ _id: viewer._id }, [
      {
        $set: {
          tasks: {
            $concatArrays: [{ $ifNull: ['$tasks', newTasksDataIds] }]
          }
        }
      }
    ]);
    console.log('res.value', res.value);
  } else {
    const res = await db.users.findOneAndUpdate({ _id: viewer._id }, [
      { $set: { tasks: { $concatArrays: ['$tasks', newTasksDataIds] } } }
    ]);

    console.log('res.value', res.value);
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

      if (!viewer) {
        throw new Error('Viewer cannot be found!');
      }

      // Create ONLY New Tasks
      const newTasksData = input.tasks.filter((task) => task.isNew);
      if (newTasksData.length > 0) {
        const newTasks = newTasksData.map(({ title, amt }, i) => ({
          _id: new ObjectId(),
          title,
          amt,
          user: viewer._id,
          isNew: false,
          isFinished: false, // Gotta make this come from the front end later
          positionId: -1
        }));

        const insertResult = await db.tasks.insertMany(newTasks);
        const newTasksDataIds = Object.values(insertResult['insertedIds']);
        // Merge new tasks with user's tasks.
        await concatTasksToUser(db, viewer, newTasksDataIds);
      }

      // Get all the tasks are not finished

      const bulkWriteData = input.tasks.map((task, i) => {
        return {
          updateOne: {
            filter: { _id: new ObjectId(task.id) },
            update: { $set: { positionId: i } }
          }
        };
      });

      console.log('bulkWriteData', JSON.stringify(bulkWriteData));

      await db.tasks.bulkWrite(bulkWriteData);

      const cursor = await db.tasks.find({
        isFinished: false
      });
      const unfinishedTasks = await cursor.toArray();
      const total = await cursor.count();

      // Update their position index

      return {
        result: unfinishedTasks,
        total: total
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
