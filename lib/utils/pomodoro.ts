export enum PomCycle {
  Pomodoro = 'POMODORO',
  ShortBreak = 'SHORTBREAK',
  LongBreak = 'LONGBREAK'
}

export const POMODORO = 'pomodoro';
export const SHORT_BREAK = 'short-break';
export const LONG_BREAK = 'long-break';
export const RUN_TIMER = 'run-timer';
export const PAUSE_TIMER = 'pause-timer';
export const RESET_TIMER = 'reset-timer';
export const NEW_TIME = 'new-time';
export const ADD_POM_COUNT = 'add-pom-count';

export function selectTimePerCycle({
  cycle,
  pomDuration,
  shortBreakDuration,
  longBreakDuration
}) {
  if (cycle === PomCycle.Pomodoro) {
    return pomDuration;
  } else if (cycle === PomCycle.ShortBreak) {
    return shortBreakDuration;
  } else if (cycle === PomCycle.LongBreak) {
    return longBreakDuration;
  }
  return null;
}

export function pomReducer(state, action) {
  switch (action.type) {
    case POMODORO:
      return {
        ...state,
        timer: action.payload.pomDuration,
        cycle: PomCycle.Pomodoro,
        isRunning: false
      };

    case SHORT_BREAK:
      return {
        ...state,
        timer: action.payload.shortBreakDuration,
        cycle: PomCycle.ShortBreak,
        isRunning: false
      };
    case LONG_BREAK:
      return {
        ...state,
        timer: action.payload.longBreakDuration,
        cycle: PomCycle.LongBreak,
        isRunning: false
      };
    case RUN_TIMER:
      return {
        ...state,
        isRunning: true
      };

    case PAUSE_TIMER:
      return {
        ...state,
        isRunning: false
      };

    case RESET_TIMER:
      return {
        ...state,
        timer: selectTimePerCycle(state),
        isRunning: false
      };
    case NEW_TIME:
      return {
        ...state,
        timer: action.payload
      };
    case ADD_POM_COUNT:
      return {
        ...state,
        pomCount: state.pomCount + 1
      };

    default:
      return state;
  }
}

export function timeConversion(duration: number) {
  const portions: string[] = [];

  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(duration / msInHour);
  if (hours > 0) {
    portions.push(hours + 'h');
    duration = duration - hours * msInHour;
  }

  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(duration / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + 'm');
    duration = duration - minutes * msInMinute;
  }

  const seconds = Math.trunc(duration / 1000);
  if (seconds > 0) {
    portions.push(seconds + 's');
  }

  return portions.join(' ');
}
