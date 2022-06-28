import { useForm, Controller } from "react-hook-form";
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

import { useUpdateViewerSettingsMutation } from "@/lib/generated";
import { minutesToMilliseconds, milliSecondsToMinutes } from "@/lib/utils";
import { useUser } from "@/lib/hooks";
import { graphqlClient } from "@/apollo/graphql-request-client";

export const SettingsSection = () => {
  const { user } = useUser();
  const { mutate: updateViewerSettings } =
    useUpdateViewerSettingsMutation(graphqlClient);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      pomDuration: milliSecondsToMinutes(user.pomDuration),
      shortBreakDuration: milliSecondsToMinutes(user.shortBreakDuration),
      longBreakDuration: milliSecondsToMinutes(user.longBreakDuration),
      longBreakInterval: user.longBreakInterval
    }
  });
  const onSubmit = (data) => {
    const formattedTimeDurations = {
      pomDuration: minutesToMilliseconds(data.pomDuration),
      shortBreakDuration: minutesToMilliseconds(data.shortBreakDuration),
      longBreakDuration: minutesToMilliseconds(data.longBreakDuration),
      longBreakInterval: parseInt(data.longBreakInterval)
    };
    updateViewerSettings({
      input: formattedTimeDurations
    });
  };
  return (
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
  );
};
