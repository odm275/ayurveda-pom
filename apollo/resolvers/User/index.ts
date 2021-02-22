import { User } from '../../../database/types';

export const userResolvers = {
  User: {
    id: (user: User): string => {
      return user._id;
    }
  }
};
