import gql from 'graphql-tag';

export const UPDATE_USER_SETTINGS = gql`
  mutation UpdateUserSettings($input: UpdateUserSettingsInput) {
    updateUserSettings(input: $input) {
      id
    }
  }
`;
