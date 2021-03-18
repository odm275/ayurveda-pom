import React, { useReducer } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Flex,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { BiPlay, BiPause, BiReset } from 'react-icons/bi';
import { useInterval } from '@/lib/hooks/useInterval';
import { useEffectWithoutOnMount } from '@/lib/hooks/useEffectWithoutOnMount';
import { UPDATE_USER_SETTINGS } from '@/lib/graphql/mutations';
import {
  UpdateUserSettings,
  UpdateUserSettingsVariables
} from '@/lib/graphql/mutations/UpdateUserSettings/__generated__/UpdateUserSettings';
import {
  pomReducer,
  selectTimePerCycle,
  timeConversion,
  PomCycle,
  POMODORO,
  SHORT_BREAK,
  LONG_BREAK,
  RUN_TIMER,
  PAUSE_TIMER,
  RESET_TIMER,
  NEW_TIME,
  ADD_POM_COUNT
} from '@/lib/utils/pomodoro';
import {
  displayErrorNotification,
  displaySuccessNotification
} from '@/lib/utils/index';
import SuccessBanner from '@/lib/components/SuccessBanner';
import { TaskType } from '@/lib/types';

import {
  UpdateTasks as UpdatedTasksData,
  UpdateTasksVariables
} from '@/lib/graphql/mutations/UpdateTasks/__generated__/UpdateTasks';
import { UPDATE_TASKS } from '@/lib/graphql/mutations';

interface Props {
  pomCycle: PomCycle;
  pomDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  pomCount: number;
  tasks: TaskType[];
  setTasks: any;
}

function successfulCycleAlert(message: string) {
  new Notification(message);

  const audioTune = new Audio(
    'https://ayurveda-pomodoro.s3.amazonaws.com/Store_Door_Chime-Mike_Koenig-570742973.mp3'
  );
  audioTune.load();
  audioTune.play();
}

const PomodoroTimer = ({
  pomCycle,
  pomDuration,
  shortBreakDuration,
  longBreakDuration,
  longBreakInterval,
  pomCount,
  tasks,
  setTasks
}: Props) => {
  const [updateTasks, { loading, error }] = useMutation<
    UpdatedTasksData,
    UpdateTasksVariables
  >(UPDATE_TASKS);
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

  const [updateUserSettings] = useMutation<
    UpdateUserSettings,
    UpdateUserSettingsVariables
  >(UPDATE_USER_SETTINGS, {
    onCompleted: () => {
      displaySuccessNotification('Updated User Settings');
    },
    onError: () => {
      displayErrorNotification("Sorry! Could't update your user settings");
    }
  });

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

  const second = 1000;
  useInterval(
    () => {
      const newTime = state.timer - second;
      dispatch({ type: NEW_TIME, payload: newTime });
    },
    state.isRunning ? 10 : null
  );

  const timeForPomodoro =
    state.cycle === PomCycle.ShortBreak || state.cycle === PomCycle.LongBreak;
  const timeForShortBreak = state.pomCount % longBreakInterval !== 0;
  const timeForLongBreak = state.pomCount % longBreakInterval === 0;
  const timeEnded = state.timer === 0;

  useEffectWithoutOnMount(() => {
    if (state.timer === 0) {
      if (timeForPomodoro) {
        dispatch({ type: POMODORO, payload: durationValues });
        successfulCycleAlert('Time to work!');
      } else {
        dispatch({ type: ADD_POM_COUNT });
      }
    }
  }, timeEnded);

  useEffectWithoutOnMount(() => {
    const removeAmtCurrentTask = (tasks: TaskType[]) => {
      const copyAllTasks = Array.from(tasks);
      const [currentTask] = copyAllTasks.slice(0, 1);
      const updatedTaskData = {
        ...currentTask,
        amt: currentTask.amt - 1
      };
      copyAllTasks.splice(0, 1, updatedTaskData);
      return copyAllTasks;
    };

    const newTasksData = removeAmtCurrentTask(tasks);
    setTasks(newTasksData);

    if (timeForShortBreak) {
      dispatch({ type: SHORT_BREAK, payload: durationValues });
      successfulCycleAlert(
        'Take a short Break -- go to the bathroom or medidate'
      );
    } else if (timeForLongBreak) {
      dispatch({ type: LONG_BREAK, payload: durationValues });
      successfulCycleAlert('Take a long break! Take a nap or go outside :)');
    }
  }, state.pomCount);

  useEffectWithoutOnMount(() => {
    updateUserSettings({
      variables: {
        input: {
          pomCycle: state.cycle,
          date: dayjs().format('MM-DD-YYYY')
        }
      }
    });
  }, state.cycle);

  useEffectWithoutOnMount(() => {
    updateTasks({
      variables: {
        input: { tasks: tasks }
      }
    });
  }, tasks);

  const progressPercentage = (state.timer / selectTimePerCycle(state)) * 100;

  return (
    <Box>
      {succesCycleBannerElement}
      <Flex justifyContent="center" flexDir="column" alignItems="center">
        <CircularProgress
          value={progressPercentage}
          size="400px"
          thickness="5px"
          color="black"
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

export default PomodoroTimer;
