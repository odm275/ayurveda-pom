import { useState, useRef, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { Flex, Button, Spinner, useDisclosure } from "@chakra-ui/react";
import PomodoroTimer from "@/lib/components/PomodoroTimer";
import AppHeaderSkeleton from "@/lib/components/AppHeaderSkeleton";
import ErrorBanner from "@/lib/components/ErrorBanner";
import { Layout } from "@/lib/components/Layout";
import { useAuth } from "@/lib/context/AuthContext";
import { newPayload } from "@/lib/utils/omitTypename";
import { TaskType } from "@/lib/types";
import {
  UpdateTasks as UpdatedTasksData,
  UpdateTasksVariables
} from "@/lib/graphql/mutations/UpdateTasks/__generated__/UpdateTasks";
import { UPDATE_TASKS } from "@/lib/graphql/mutations";

/* Login in mutation stuff */
import { LOG_IN } from "../lib/graphql/mutations";
import {
  LogIn as LogInData,
  LogInVariables
} from "../lib/graphql/mutations/LogIn/__generated__/LogIn";
import { Viewer } from "../lib/types";
import dayjs from "dayjs";
import { authContext } from "@/lib/context/AuthContext";
import { TaskListSection } from "@/lib/components/TaskListSection";

const initialViewer: Viewer = {
  avatar:
    "https://lh3.googleusercontent.com/a-/AOh14GgON61oEh2hXDeGJ_uTAyUrzbfA_3iE_aDJH15SKQ=s100",
  didRequest: false,
  hasWallet: null,
  id: null,
  longBreakDuration: null,
  longBreakInterval: null,
  pomCount: null,
  pomCycle: null,
  pomDuration: null,
  pomData: null,
  shortBreakDuration: null,
  currentTasks: null,
  token: null
};

const Index = () => {
  const { viewer, error } = useAuth();

  // const [viewer, setViewer] = useState<Viewer>(initialViewer);

  // const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
  //   onCompleted: (data) => {
  //     console.log('onCompleted data', data)
  //     if (data && data.logIn) {
  //       setViewer(data.logIn);

  //       if (data.logIn.token) {
  //         sessionStorage.setItem('token', data.logIn.token);
  //       } else {
  //         sessionStorage.removeItem('token');
  //       }
  //     }
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   }
  // });
  // const logInRef = useRef(logIn);

  // useEffect(() => {
  //   // logInRef.current();
  //   console.log("use effect")
  //   logInRef.current({
  //     variables: {
  //       date: dayjs().format('MM-DD-YYYY')
  //     }
  //   });
  // }, []);

  // Update tasks whenever a new pomodoro cycle is completed
  const [tasks, setTasks] = useState<TaskType[] | null>([]);

  const [
    updateTasks,
    { loading: loadingUpdateTasks, error: updateTasksError }
  ] = useMutation<UpdatedTasksData, UpdateTasksVariables>(UPDATE_TASKS);

  useEffect(() => {
    const _tasks = viewer?.currentTasks?.result
      ? newPayload(viewer.currentTasks.result)
      : [];
    setTasks(_tasks);
  }, [viewer.didRequest]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();
  // User is loading
  if (!viewer.didRequest && !error) {
    return (
      <Flex flexDir="column" p={3}>
        <AppHeaderSkeleton />
        <Flex justifyContent="center">
          <Spinner
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </Flex>
    );
  }

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We aren't able to verify if you were logged in. Please try again later!" />
  ) : null;

  return (
    <Layout>
      {logInErrorBannerElement}
      <TaskListSection
        tasks={tasks}
        setTasks={setTasks}
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        loadingUpdateTasks={loadingUpdateTasks}
      />
      <Flex justifyContent="center">
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
          My Tasks
        </Button>
      </Flex>
      <PomodoroTimer
        pomCycle={viewer.pomCycle}
        pomDuration={viewer.pomDuration}
        shortBreakDuration={viewer.shortBreakDuration}
        longBreakDuration={viewer.longBreakDuration}
        longBreakInterval={viewer.longBreakInterval}
        pomCount={viewer.pomCount}
        tasks={tasks}
        setTasks={setTasks}
        updateTasks={updateTasks}
      />
    </Layout>
  );
};

export default Index;
