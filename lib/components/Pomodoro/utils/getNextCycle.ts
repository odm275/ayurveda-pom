import { PomCycle } from "@/lib/generated";

// When the timer runs out, this will be the next cycle

export function getNextCycle({ cycle, pomCount, longBreakInterval }) {
  const rem = pomCount % longBreakInterval;
  if (cycle === PomCycle.Pomodoro && rem !== 0) {
    return "shortBreak";
  }
  if (cycle === PomCycle.Pomodoro && rem === 0) {
    return "longBreak";
  }
  return "pomodoro";
}
