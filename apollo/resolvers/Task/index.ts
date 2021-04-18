import { NextApiRequest } from 'next';
import { ObjectId } from 'mongodb';
import { IResolvers } from 'graphql-tools';
import { UpdateTasksArgs, TasksData } from './types';
import { Task, Database } from '../../../database/types';
import { authorize } from '@/apollo/utils/authorize';
import { position } from '@chakra-ui/react';
import { identitytoolkit } from 'googleapis/build/src/apis/identitytoolkit';

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

const updateTasksPositions = async (db, tasksData) => {
  const bulkWriteData = tasksData.map(
    ({ id, positionId, amt, isFinished, isNew }) => {
      return {
        updateOne: {
          filter: { _id: new ObjectId(id) },
          update: { $set: { positionId, amt, isFinished, isNew } }
        }
      };
    }
  );
  console.log(JSON.stringify(bulkWriteData));
  await db.tasks.bulkWrite(bulkWriteData);
};

export const taskResolvers: IResolvers = {
  Mutation: {
    updateTasks: async (
      __root: undefined,
      { input }: UpdateTasksArgs,
      { db, req }: { db: Database; req: NextApiRequest }
    ): Promise<TasksData> => {
      console.log('updateTasks');
      console.log(input.tasks);

      const viewer = await authorize(db, req);

      if (!viewer) {
        throw new Error('Viewer cannot be found!');
      }

      // Set positions

      const tasksWPosition = input.tasks.map((task, i) => {
        return {
          ...task,
          amt: task.amt,
          positionId: i
        };
      });

      // Create ONLY New Tasks

      const newTasksData = tasksWPosition.filter((task) => task.isNew);
      console.log('newTasksData', newTasksData);

      if (newTasksData.length > 0) {
        console.log('new tasks coming in');
        const oldTasksData = tasksWPosition.filter((task) => !task.isNew);
        const newTasks = newTasksData.map(({ title, amt, positionId }) => ({
          _id: new ObjectId(),
          title,
          amt,
          user: viewer._id,
          isNew: false,
          isFinished: false,
          positionId: positionId
        }));

        const updateNewTasksPositionsData = newTasks.map(
          ({ _id, positionId, amt, isNew, isFinished }) => {
            return {
              id: _id.toString(),
              amt,
              isNew,
              isFinished,
              positionId
            };
          }
        );

        const updateOldTasksPositionsData = oldTasksData.map(
          ({ id, positionId, amt, isNew, isFinished }) => {
            return {
              id,
              amt,
              isNew,
              isFinished,
              positionId
            };
          }
        );

        const allTasksData = [
          ...updateOldTasksPositionsData,
          ...updateNewTasksPositionsData
        ];

        const insertResult = await db.tasks.insertMany(newTasks);
        const newTasksDataIds = Object.values(insertResult['insertedIds']);
        // Merge new tasks with user's tasks.
        await concatTasksToUser(db, viewer, newTasksDataIds);

        await updateTasksPositions(db, allTasksData);

        const cursor = await db.tasks.find({
          isFinished: false
        });
        const unfinishedTasks = await cursor.toArray();
        const total = await cursor.count();

        return {
          result: unfinishedTasks,
          total: total
        };
      } else {
        // Get all the tasks are not finished

        await updateTasksPositions(db, tasksWPosition);

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
      }
    },
    test: () => {
      console.log('test');

      [
        {
          updateOne: {
            filter: { _id: '6050e6b76de72a2282c6422b' },
            update: { $set: { positionId: 0, amt: 1 } }
          }
        },
        {
          updateOne: {
            filter: { _id: '6050e6b76de72a2282c6422a' },
            update: { $set: { positionId: 1, amt: 1 } }
          }
        },
        {
          updateOne: {
            filter: { _id: '6050e6686de72a2282c64225' },
            update: { $set: { positionId: 2, amt: 1 } }
          }
        },
        {
          updateOne: {
            filter: { _id: '6050e67c6de72a2282c64226' },
            update: { $set: { positionId: 3, amt: 1 } }
          }
        },
        {
          updateOne: {
            filter: { _id: '6050e6946de72a2282c64228' },
            update: { $set: { positionId: 4, amt: 1 } }
          }
        },
        {
          updateOne: {
            filter: { _id: '6050e67c6de72a2282c64227' },
            update: { $set: { positionId: 5, amt: 1 } }
          }
        },
        {
          updateOne: {
            filter: { _id: '6050e6946de72a2282c64229' },
            update: { $set: { positionId: 6, amt: 1 } }
          }
        }
      ];

      return 'Task.test';
    }
  },
  Task: {
    id: (task: Task): string => {
      return task._id.toString();
    }
  }
};
