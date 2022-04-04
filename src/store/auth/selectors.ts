import { createSelector } from "reselect";

import { RootStateType } from "store/store";

const getUserName = (state: RootStateType) => state?.auth?.user?.name;

export const selectUserState = createSelector(getUserName, (name) => name);
