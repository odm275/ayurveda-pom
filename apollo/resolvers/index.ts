import merge from 'lodash.merge';
import { userResolvers } from './User';
import { viewerResolvers } from './Viewer';
import { taskResolvers } from './Task';

export const resolvers = merge(userResolvers, viewerResolvers, taskResolvers);
