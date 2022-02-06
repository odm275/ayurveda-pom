/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserSettingsInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserSettings
// ====================================================

export interface UpdateUserSettings_updateUserSettings {
  __typename: "Viewer";
  id: string | null;
}

export interface UpdateUserSettings {
  updateUserSettings: UpdateUserSettings_updateUserSettings;
}

export interface UpdateUserSettingsVariables {
  input?: UpdateUserSettingsInput | null;
}
