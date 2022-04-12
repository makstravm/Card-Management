import { createSelector } from "reselect";

import { RootStateType } from "store/store";

const getFieldsList = (state: RootStateType) => state?.fields?.fieldsList;

export const selectFieldsList = createSelector(
  getFieldsList,
  (fieldsList) => fieldsList
);
