import { enumType } from 'nexus';

export const pomCycle = enumType({
  name: 'pomCycle',
  members: ['POMODORO', 'SHORTBREAK', 'LONGBREAK']
});