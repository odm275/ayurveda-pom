import { ReactNode, useReducer, useState } from "react";
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
  useUpdateViewerDataMutation,
  PomCycle,
  usePomCycleUpdateMutation,
  useViewerPomDataQuery,
  useViewerCurrentTasksQuery,
  Task
} from "@/lib/generated";

import {
  selectTimePerCycle,
  timeConversion,
  cycleAlert,
  getNextCycle,
  POMODORO,
  SHORT_BREAK,
  LONG_BREAK,
  RUN_TIMER,
  PAUSE_TIMER,
  RESET_TIMER,
  NEW_TIME,
  SECOND,
  VIEWER_POM_DATA_QUERY_COMPLETE
} from "./utils";
import { pomReducer } from "./reducer";
import { ActionButton } from "./components";

interface Props {
  pomCycle: PomCycle;
  pomDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  pomCount: number;
  setViewer: (unknown) => void;
  tasks: null | Task[];
  setTasks: (unknown) => void;
}

const removeAmtCurrentTask = (tasks: TaskType[]) => {
  const copyAllTasks = Array.from(tasks);

  const [currentTask] = copyAllTasks.slice(0, 1);
  const newAmt = currentTask.amt - 1;

  const updatedTaskData = {
    ...currentTask,
    amt: newAmt
  };

  copyAllTasks.splice(0, 1, updatedTaskData);
  const newTasksArray = [...copyAllTasks];
  return newTasksArray;
};

export const Pomodoro = ({ pomCount, setViewer, setTasks, tasks }: Props) => {
  const pomData = useViewerPomDataQuery({
    onCompleted: (data) => {
      // Set pomReducer here
      const {
        longBreakDuration,
        longBreakInterval,
        pomCycle,
        pomDuration,
        shortBreakDuration
      } = data.viewerPomData;

      const values = {
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
        longBreakDuration,
        longBreakInterval
      };
      dispatch({ type: VIEWER_POM_DATA_QUERY_COMPLETE, payload: values });
    }
  });

  const [state, dispatch] = useReducer(pomReducer, {
    cycle: null,
    timer: null,
    isRunning: null,
    pomCount: null,
    timerReset: false,
    pomDuration: null,
    shortBreakDuration: null,
    longBreakDuration: null,
    longBreakInterval: null
  });

  useInterval(
    () => {
      const newTime = state.timer - SECOND;
      dispatch({ type: NEW_TIME, payload: newTime });
    },
    state.isRunning ? 10 : null
  );

  const [updatePomCycle] = usePomCycleUpdateMutation({
    onCompleted: () => {
      displaySuccessNotification("Updated User Settings");
    },
    onError: () => {
      displayErrorNotification("Sorry! Could't update your user settings");
    }
  });

  const handleTaskCompletion = () => {
    const newTasksData = removeAmtCurrentTask(tasks);
    setTasks(newTasksData);
  };

  const setUpdate = {
    pomodoro: () => {
      const durationValues = {
        pomDuration: state.pomDuration,
        shortBreakDuration: state.shortBreakDuration,
        longBreakDuration: state.longBreakDuration,
        longBreakInterval: state.longBreakInterval
      };
      dispatch({ type: POMODORO, payload: durationValues });
      cycleAlert("Time to work!");
    },
    shortBreak: () => {
      const durationValues = {
        pomDuration: state.pomDuration,
        shortBreakDuration: state.shortBreakDuration,
        longBreakDuration: state.longBreakDuration,
        longBreakInterval: state.longBreakInterval
      };
      dispatch({ type: SHORT_BREAK, payload: durationValues });
      handleTaskCompletion();
      cycleAlert("Take a short Break -- go to the bathroom or stretch");
    },
    longBreak: () => {
      const durationValues = {
        pomDuration: state.pomDuration,
        shortBreakDuration: state.shortBreakDuration,
        longBreakDuration: state.longBreakDuration,
        longBreakInterval: state.longBreakInterval
      };
      dispatch({ type: LONG_BREAK, payload: durationValues });
      handleTaskCompletion();
      cycleAlert("Take a long break! Walk around or go outside!");
    }
  };
  const timeEnded = state.timer === 0;

  const nextCycle = getNextCycle({
    longBreakInterval: state.longBreakInterval,
    cycle: state.cycle,
    pomCount: state.pomCount
  });

  useEffectWithoutOnMount(() => {
    updatePomCycle({
      variables: {
        input: {
          pomCycle: state.cycle,
          date: dayjs().format("MM-DD-YYYY"),
          increasePomCounter: state.cycle !== PomCycle.Pomodoro
        }
      }
    });
  }, [state.pomCount, state.cycle]);

  const progressPercentage = (state.timer / selectTimePerCycle(state)) * 100;
  const canUsePom = tasks.length > 0 || state.cycle !== PomCycle.Pomodoro;

  if (timeEnded) {
    setUpdate[nextCycle]();
  }
  const pauseOrPlayButton = !state.isRunning ? (
    <ActionButton isDisabled={canUsePom}>
      <BiPlay
        size={45}
        onClick={canUsePom ? () => dispatch({ type: RUN_TIMER }) : null}
      />
    </ActionButton>
  ) : (
    <ActionButton isDisabled={canUsePom}>
      <BiPause
        onClick={canUsePom ? () => dispatch({ type: PAUSE_TIMER }) : null}
        size={45}
      />
    </ActionButton>
  );

  const resetButton = (
    <ActionButton isDisabled={canUsePom}>
      <BiReset
        size={45}
        onClick={canUsePom ? () => dispatch({ type: RESET_TIMER }) : null}
      />
    </ActionButton>
  );
  const successCycleBannerElement =
    state.timer === 0 ? (
      <SuccessBanner description="You've succesfully completed a cycle!" />
    ) : null;

  return (
    <Box>
      {successCycleBannerElement}
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
