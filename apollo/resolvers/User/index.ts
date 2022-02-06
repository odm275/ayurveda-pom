import { User } from '../../../database/types';
import { IResolvers } from 'graphql-tools';

export const userResolvers: IResolvers = {
  User: {
    id: (user: User): string => {
      return user._id;
    }
  }
};
