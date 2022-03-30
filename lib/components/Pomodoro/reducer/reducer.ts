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
import { selectTimePerCycle } from "../utils";

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
        isRunning: false
      };
    case LONG_BREAK:
      return {
        ...state,
        timer: action.payload.longBreakDuration,
        cycle: PomCycle.Longbreak,
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
