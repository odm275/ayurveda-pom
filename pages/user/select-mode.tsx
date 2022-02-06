import { Layout } from '@/lib/components/Layout';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_SETTINGS } from '@/lib/graphql/mutations/';
import {
  UpdateUserSettings,
  UpdateUserSettingsVariables
} from '@/lib/graphql/mutations/UpdateUserSettings/__generated__/UpdateUserSettings';

import { Heading, Text, Box, Flex, Button, Spacer } from '@chakra-ui/react';
import SelectionCard from '@/lib/components/SelectionCard';
import {
  displaySuccessNotification,
  displayErrorNotification
} from '@/lib/utils/index';
import { earthSettings, fireSettings, airSettings } from '@/lib/utils/settings';
import Earth from '../../public/earth.svg';
import Fire from '../../public/fire.svg';
import Air from '../../public/air.svg';

const SelectMode = () => {
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

  const onClick = (settings) => () => {
    updateUserSettings({
      variables: {
        input: settings
      }
    });
  };

  return (
    <Layout>
      <Flex flexDir="column">
        <Heading>Select Learning Mode</Heading>
        <Flex flexDir="row">
          <SelectionCard
            icon={<Earth />}
            heading="Earth"
            desc="You have high concentration. You start off slow but once you get
            going -- you are the fastest."
            onClick={onClick(earthSettings)}
          />
          <Spacer />
          <SelectionCard
            icon={<Fire />}
            heading="Fire"
            desc="Once you get going ... you get going!! You're driven towards a particular thing. Stable 9-5 workdays are what you excel at."
            onClick={onClick(fireSettings)}
          />
          <Spacer />
          <SelectionCard
            icon={<Air />}
            heading="Air"
            desc="You are a sprinter. You'll go from 0 to 100% fast but burn out fast."
            onClick={onClick(airSettings)}
          />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default SelectMode;
