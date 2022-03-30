import React, { useReducer } from "react";
import {
  Box,
  Flex,
  CircularProgress,
  CircularProgressLabel
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { BiPlay, BiPause, BiReset } from "react-icons/bi";
import { useInterval } from "@/lib/hooks/useInterval";
import { useEffectWithoutOnMount } from "@/lib/hooks/useEffectWithoutOnMount";
import {
  displayErrorNotification,
  displaySuccessNotification
} from "@/lib/utils/toast";
import SuccessBanner from "@/lib/components/SuccessBanner";
import {
  Task as TaskType,
  useUpdateUserSettingsMutation,
  PomCycle
} from "@/lib/generated";

import {
  selectTimePerCycle,
  timeConversion,
  cycleAlert,
  POMODORO,
  SHORT_BREAK,
  LONG_BREAK,
  RUN_TIMER,
  PAUSE_TIMER,
  RESET_TIMER,
  NEW_TIME,
  ADD_POM_COUNT,
  SECOND
} from "./utils";
import { pomReducer } from "./reducer";

interface Props {
  pomCycle: PomCycle;
  pomDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  pomCount: number;
  tasks: TaskType[];
  setTasks: any;
  updateTasks: any;
}

const removeAmtCurrentTask = (tasks: TaskType[]) => {
  const copyAllTasks = Array.from(tasks);
  const unFinishedTasks = copyAllTasks.filter((task) => !task.isFinished);
  const finishedTasks = copyAllTasks.filter((task) => task.isFinished);

  const [currentTask] = unFinishedTasks.slice(0, 1);
  const newAmt = currentTask.amt - 1;
  const isFinished = newAmt < 1;

  const updatedTaskData = {
    ...currentTask,
    amt: newAmt,
    isFinished: isFinished
  };

  unFinishedTasks.splice(0, 1, updatedTaskData);
  const newTasksArray = [...unFinishedTasks, ...finishedTasks];
  return newTasksArray;
};

export const Pomodoro = ({
  pomCycle,
  pomDuration,
  shortBreakDuration,
  longBreakDuration,
  longBreakInterval,
  pomCount,
  tasks,
  setTasks,
  updateTasks
}: Props) => {
  const initialState = {
    cycle: pomCycle,
    timer: selectTimePerCycle({
      cycle: pomCycle,
      pomDuration,
      shortBreakDuration,
      longBreakDuration
    }),
    isRunning: false,
    pomCount: pomCount,
    timerReset: false,
    pomDuration,
    shortBreakDuration,
    longBreakDuration
  };
  const [state, dispatch] = useReducer(pomReducer, initialState);

  const durationValues = {
    pomDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval
  };

  const timeForPomodoro =
    state.cycle === PomCycle.Shortbreak || state.cycle === PomCycle.Longbreak;
  const timeForShortBreak = state.pomCount % longBreakInterval !== 0;
  const timeForLongBreak = state.pomCount % longBreakInterval === 0;
  const timeEnded = state.timer === 0;

  const [updateUserSettings] = useUpdateUserSettingsMutation({
    onCompleted: () => {
      displaySuccessNotification("Updated User Settings");
    },
    onError: () => {
      displayErrorNotification("Sorry! Could't update your user settings");
    }
  });

  useInterval(
    () => {
      const newTime = state.timer - SECOND;
      dispatch({ type: NEW_TIME, payload: newTime });
    },
    state.isRunning ? 10 : null
  );

  useEffectWithoutOnMount(() => {
    if (timeEnded) {
      if (timeForPomodoro) {
        dispatch({ type: POMODORO, payload: durationValues });
        cycleAlert("Time to work!");
      } else {
        dispatch({ type: ADD_POM_COUNT });
      }
    }
  }, state.timer);

  useEffectWithoutOnMount(() => {
    const newTasksData = removeAmtCurrentTask(tasks);
    setTasks(newTasksData);

    if (timeForShortBreak) {
      dispatch({ type: SHORT_BREAK, payload: durationValues });
      cycleAlert("Take a short Break -- go to the bathroom or medidate");
    } else if (timeForLongBreak) {
      dispatch({ type: LONG_BREAK, payload: durationValues });
      cycleAlert("Take a long break! Take a nap or go outside :)");
    }
  }, state.pomCount);

  useEffectWithoutOnMount(() => {
    updateUserSettings({
      variables: {
        input: {
          pomCycle: state.cycle,
          date: dayjs().format("MM-DD-YYYY")
        }
      }
    });
  }, state.cycle);
  useEffectWithoutOnMount(() => {
    if (tasks.length > 0 && timeEnded) {
      console.log("updating tasks ....");
      updateTasks({
        variables: {
          input: { tasks: tasks }
        }
      });
    }
  }, tasks);

  const progressPercentage = (state.timer / selectTimePerCycle(state)) * 100;

  const pauseOrPlayButton = !state.isRunning ? (
    <BiPlay onClick={() => dispatch({ type: RUN_TIMER })} size={45} />
  ) : (
    <BiPause onClick={() => dispatch({ type: PAUSE_TIMER })} size={45} />
  );

  const resetButton = (
    <BiReset size={45} onClick={() => dispatch({ type: RESET_TIMER })} />
  );

  const succesCycleBannerElement =
    state.timer === 0 ? (
      <SuccessBanner description="You've succesfully completed a cycle!" />
    ) : null;

  return (
    <Box>
      {succesCycleBannerElement}
      <Flex justifyContent="center" flexDir="column" alignItems="center">
        <CircularProgress
          value={progressPercentage}
          size="400px"
          thickness="5px"
        >
          <CircularProgressLabel fontSize="10%">
            {timeConversion(state.timer)}
          </CircularProgressLabel>
        </CircularProgress>
        <Flex>
          {resetButton}
          {pauseOrPlayButton}
        </Flex>
      </Flex>
    </Box>
  );
};
