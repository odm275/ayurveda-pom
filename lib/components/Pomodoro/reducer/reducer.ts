import {
  POMODORO,
  SHORT_BREAK,
  LONG_BREAK,
  RUN_TIMER,
  PAUSE_TIMER,
  RESET_TIMER,
  NEW_TIME,
  ADD_POM_COUNT
} from "./utils/constants";
import { PomCycle } from "@/lib/generated";
import { selectTimePerCycle, VIEWER_POM_DATA_QUERY_COMPLETE } from "../utils";

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
        cycle: PomCycle.Shortbreak,
        isRunning: false,
        pomCount: state.pomCount + 1
      };
    case LONG_BREAK:
      return {
        ...state,
        timer: action.payload.longBreakDuration,
        cycle: PomCycle.Longbreak,
        isRunning: false,
        pomCount: state.pomCount + 1
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

    case VIEWER_POM_DATA_QUERY_COMPLETE:
      return {
        ...state,
        cycle: action.payload.pomCycle,
        timer: action.payload.timer,
        isRunning: false,
        pomCount: action.payload.pomCount,
        timerReset: false,
        pomDuration: action.payload.pomDuration,
        shortBreakDuration: action.payload.shortBreakDuration,
        longBreakDuration: action.payload.longBreakDuration,
        longBreakInterval: action.payload.longBreakInterval
      };

    default:
      return state;
  }
}
