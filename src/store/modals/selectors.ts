import { createSelector } from "reselect";

import { RootStateType } from "store/";

const selectModal = (state: RootStateType) => state?.modal;

export const selectModalChange = createSelector(selectModal, (modal) => modal);
