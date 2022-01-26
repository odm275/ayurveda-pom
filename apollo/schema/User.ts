import { objectType, arg } from 'nexus';
import { pomCycle } from './enums/pomCycle';
export const User = objectType({
  name: 'User',
  definition(t){
    t.string('id');
    t.string('name');
    t.string('status');
    t.int('pomDuration');
    t.int('shortBreakDuration');
    t.int('longBreakDuration');
    t.int('longBreakInterval');
    t.string('pomCycle', {
      args: {
        size: arg({ type: pomCycle }),
      }
    });
  }
})