import { useReducer } from "react";
import {
  Box,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Tooltip
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
  useUpdateViewerDataMutation,
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
  SECOND
} from "./utils";
import { pomReducer } from "./reducer";
import { NoTasksWarning, ActionButton } from "./components";

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

// When the timer runs out, this will be the next cycle
function getNextCycle({ cycle, pomCount, longBreakInterval }) {
  const rem = pomCount % longBreakInterval;
  if (cycle === PomCycle.Pomodoro && rem !== 0) {
    return "shortBreak";
  }
  if (cycle === PomCycle.Pomodoro && rem === 0) {
    return "longBreak";
  }
  return "pomodoro";
}

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
  console.log("tasks", tasks);
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
    longBreakDuration,
    longBreakInterval
  };

  const durationValues = {
    pomDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval
  };

  const [state, dispatch] = useReducer(pomReducer, initialState);

  useInterval(
    () => {
      const newTime = state.timer - SECOND;
      dispatch({ type: NEW_TIME, payload: newTime });
    },
    state.isRunning ? 10 : null
  );

  const [updateViewerData] = useUpdateViewerDataMutation({
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
      dispatch({ type: POMODORO, payload: durationValues });
      cycleAlert("Time to work!");
    },
    shortBreak: () => {
      dispatch({ type: SHORT_BREAK, payload: durationValues });
      handleTaskCompletion();
      cycleAlert("Take a short Break -- go to the bathroom or stretch");
    },
    longBreak: () => {
      dispatch({ type: LONG_BREAK, payload: durationValues });
      handleTaskCompletion();
      cycleAlert("Take a long break! Walk around or go outside!");
    }
  };
  const timeEnded = state.timer === 0;

  const nextCycle = getNextCycle({
    longBreakInterval,
    cycle: state.cycle,
    pomCount: state.pomCount
  });

  if (timeEnded) {
    setUpdate[nextCycle]();
  }

  useEffectWithoutOnMount(() => {
    updateViewerData({
      variables: {
        input: {
          pomCycle: state.cycle,
          date: dayjs().format("MM-DD-YYYY"),
          increasePomCounter: state.cycle !== PomCycle.Pomodoro
        }
      }
    });
  }, [state.pomCount, state.cycle]);

  useEffectWithoutOnMount(() => {
    if (tasks.length > 0 && timeEnded) {
      updateTasks({
        variables: {
          input: { tasks: tasks }
        }
      });
    }
  }, [tasks]);

  const progressPercentage = (state.timer / selectTimePerCycle(state)) * 100;
  const tasksExist = tasks.length > 0;

  const pauseOrPlayButton = !state.isRunning ? (
    <ActionButton
      isDisabled={tasksExist}
      onClick={() => dispatch({ type: RUN_TIMER })}
    >
      <span>
        <BiPlay size={45} />
      </span>
    </ActionButton>
  ) : (
    <Tooltip
      isDisabled={tasksExist}
      label="Create a task to use pom"
      fontSize="md"
    >
      <span>
        <BiPause onClick={() => dispatch({ type: PAUSE_TIMER })} size={45} />
      </span>
    </Tooltip>
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
          <BiReset size={45} onClick={() => dispatch({ type: RESET_TIMER })} />
          {pauseOrPlayButton}
        </Flex>
      </Flex>
    </Box>
  );
};
