import { Collection, ObjectId } from 'mongodb';

export enum PomCycle {
  Pomodoro = 'POMODORO',
  ShortBreak = 'SHORTBREAK',
  LongBreak = 'LONGBREAK'
}

export interface Viewer {
  _id?: string;
  token?: string;
  avatar?: string; //
  walletId?: string; // boolean value to indicate if the viewer has connected to the payment processor in our app
  didRequest: boolean; // a boolean value to indicate if a request has been made from the client to obtain viewer information.
  pomDuration?: number;
  shortBreakDuration?: number;
  longBreakDuration?: number;
  longBreakInterval?: number;
  pomCycle?: PomCycle;
  pomData?: PomData[];
  pomCount?: number;
}

export interface Task {
  _id: ObjectId;
  user: string; // Reference to the owner(User's _id field)
  title: string;
  amt: number;
  isNew: boolean;
}

export interface PomData {
  date: string;
  count: number;
}

export interface User {
  _id: string;
  token: string;
  name: string;
  email: string;
  avatar: string;
  walletId?: string;
  pomDuration?: number;
  shortBreakDuration?: number;
  longBreakDuration?: number;
  longBreakInterval?: number;
  tasks: ObjectId[];
  pomCycle: PomCycle;
  pomData?: PomData[];
}

export interface Database {
  users: Collection<User>;
  tasks: Collection<Task>;
}
