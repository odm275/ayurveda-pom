import { enumType } from 'nexus';

export const PomCycle = enumType({
  name: 'pomCycle',
  members: ['POMODORO', 'SHORTBREAK', 'LONGBREAK']
});