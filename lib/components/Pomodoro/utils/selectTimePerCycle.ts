import { PomCycle } from "@/lib/generated";

export function selectTimePerCycle({
  cycle,
  pomDuration,
  shortBreakDuration,
  longBreakDuration
}) {
  if (cycle === PomCycle.Pomodoro) {
    return pomDuration;
  } else if (cycle === PomCycle.Shortbreak) {
    return shortBreakDuration;
  } else if (cycle === PomCycle.Longbreak) {
    return longBreakDuration;
  }
  console.log(cycle);
  return null;
}
