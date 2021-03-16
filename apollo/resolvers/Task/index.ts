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
  const bulkWriteData = tasksData.map(({ id, positionId }) => {
    return {
      updateOne: {
        filter: { _id: new ObjectId(id) },
        update: { $set: { positionId } }
      }
    };
  });

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

      const viewer = await authorize(db, req);

      if (!viewer) {
        throw new Error('Viewer cannot be found!');
      }

      // Set positions

      const tasksWPosition = input.tasks.map((task, i) => {
        return {
          ...task,
          positionId: i
        };
      });

      // Create ONLY New Tasks

      const newTasksData = tasksWPosition.filter((task) => task.isNew);

      if (newTasksData.length > 0) {
        const oldTasksData = tasksWPosition.filter((task) => !task.isNew);
        const newTasks = newTasksData.map(({ title, amt, positionId }, i) => ({
          _id: new ObjectId(),
          title,
          amt,
          user: viewer._id,
          isNew: false,
          isFinished: false, // Gotta make this come from the front end later
          positionId: positionId
        }));

        const updateNewTasksPositionsData = newTasks.map(
          ({ _id, positionId }) => {
            return {
              id: _id.toString(),
              positionId
            };
          }
        );

        const updateOldTasksPositionsData = oldTasksData.map(
          ({ id, positionId }) => {
            return {
              id,
              positionId
            };
          }
        );

        const allTasksData = [
          ...updateOldTasksPositionsData,
          ...updateNewTasksPositionsData
        ];

        console.log('allTasksData', allTasksData);

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
      return 'Task.test';
    }
  },
  Task: {
    id: (task: Task): string => {
      return task._id.toString();
    }
  }
};
