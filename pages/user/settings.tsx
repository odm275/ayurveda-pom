import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { milliSecondsToMinutes } from "@/lib/utils";
import {
  FormControl,
  FormLabel,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button
} from "@chakra-ui/react";

import { AppLayout, LoadingOverlay } from "@/lib/components";
import { useUpdateViewerSettingsMutation } from "@/lib/generated";
import {
  minutesToMilliseconds,
  displaySuccessNotification,
  displayErrorNotification,
  withProtectedRoute
} from "@/lib/utils";
import { useAuth } from "@/lib/context";

const Settings = () => {
  // const { viewer } = useAuth();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      pomDuration: 0,
      shortBreakDuration: 0,
      longBreakDuration: 0,
      longBreakInterval: 0
    }
  });

  // useEffect(() => {
  //   if (
  //     viewer?.pomDuration &&
  //     viewer?.shortBreakDuration &&
  //     viewer?.longBreakDuration
  //   ) {
  //     setValue("pomDuration", milliSecondsToMinutes(viewer.pomDuration));
  //     setValue(
  //       "shortBreakDuration",
  //       milliSecondsToMinutes(viewer.shortBreakDuration)
  //     );
  //     setValue(
  //       "longBreakDuration",
  //       milliSecondsToMinutes(viewer.longBreakDuration)
  //     );
  //     setValue("longBreakInterval", viewer.longBreakInterval);
  //   }
  // }, [viewer]);

  // const [updateViewerSettings, { loading, error }] =
  //   useUpdateViewerSettingsMutation({
  //     onCompleted: () => {
  //       displaySuccessNotification(
  //         "Your settings have been succesfully updated",
  //         "Thank you!"
  //       );
  //     },
  //     onError: () => {
  //       displayErrorNotification(
  //         "There was an error while trying to update your settings",
  //         "Please Try Again Later"
  //       );
  //     }
  //   });

  // const onSubmit = (data) => {
  //   const formattedTimeDurations = {
  //     pomDuration: minutesToMilliseconds(data.pomDuration),
  //     shortBreakDuration: minutesToMilliseconds(data.shortBreakDuration),
  //     longBreakDuration: minutesToMilliseconds(data.longBreakDuration),
  //     longBreakInterval: parseInt(data.longBreakInterval)
  //   };
  //   updateViewerSettings({
  //     variables: {
  //       input: formattedTimeDurations
  //     }
  //   });
  // };

  function onSubmit() {
    return;
  }

  return (
    <AppLayout>
      {/* <LoadingOverlay isOpen={loading}> */}
      {/* {loading ? "loading" : "not loading"} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl id="pomDuration">
            <FormLabel>Pomodoro Duration</FormLabel>
            <Controller
              name="pomDuration"
              control={control}
              render={({ field }) => (
                <NumberInput {...field}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
          </FormControl>

          <FormControl id="shortBreakDuration">
            <FormLabel>Short Break Duration</FormLabel>
            <Controller
              name="shortBreakDuration"
              control={control}
              render={({ field }) => (
                <NumberInput {...field}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
          </FormControl>

          <FormControl id="longBreakDuration">
            <FormLabel>Long Break Duration</FormLabel>
            <Controller
              name="longBreakDuration"
              control={control}
              render={({ field }) => (
                <NumberInput {...field}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
          </FormControl>

          <FormControl id="longBreakInterval">
            <FormLabel>Long Break Interval</FormLabel>
            <Controller
              name="longBreakInterval"
              control={control}
              render={({ field }) => (
                <NumberInput {...field}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
          </FormControl>

          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
      {/* </LoadingOverlay> */}
    </AppLayout>
  );
};

export default withProtectedRoute(Settings);
