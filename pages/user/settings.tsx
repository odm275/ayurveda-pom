import { useMutation } from "@apollo/client";
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

import { Layout } from "@/lib/components/Layout";
import { UPDATE_USER_SETTINGS } from "@/lib/graphql/mutations/";
import {
  UpdateUserSettings,
  UpdateUserSettingsVariables
} from "@/lib/graphql/mutations/UpdateUserSettings/__generated__/UpdateUserSettings";
import { displaySuccessNotification } from "@/lib/utils/index";
import { useUpdateUserSettingsMutation } from "@/lib/generated";

const defaultValues = {
  pomDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 25,
  longBreakInterval: 5
};

const Settings = () => {
  const { control, handleSubmit } = useForm({ defaultValues });

  const [updateUserSettings] = useUpdateUserSettingsMutation({
    onCompleted: () => {
      displaySuccessNotification(
        "Your settings have been succesfully updated",
        "Thank you!"
      );
    }
  });

  function minutesToMilliseconds(str) {
    return parseInt(str) * 1000 * 60;
  }

  const onSubmit = (data) => {
    const formattedTimeDurations = {
      pomDuration: minutesToMilliseconds(data.pomDuration),
      shortBreakDuration: minutesToMilliseconds(data.shortBreakDuration),
      longBreakDuration: minutesToMilliseconds(data.longBreakDuration),
      longBreakInterval: parseInt(data.longBreakInterval)
    };
    updateUserSettings({
      variables: {
        input: formattedTimeDurations
      }
    });
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl id="pomDuration">
            <FormLabel>Pomodoro Duration</FormLabel>
            <Controller
              control={control}
              name="pomDuration"
              render={({ name, ...restProps }) => (
                <NumberInput name={name} {...restProps}>
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
              control={control}
              name="shortBreakDuration"
              render={({ name, ...restProps }) => (
                <NumberInput name={name} {...restProps}>
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
              control={control}
              name="longBreakDuration"
              render={({ name, ...restProps }) => (
                <NumberInput name={name} {...restProps}>
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
              control={control}
              name="longBreakInterval"
              render={({ name, ...restProps }) => (
                <NumberInput name={name} {...restProps}>
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
    </Layout>
  );
};

export default Settings;
