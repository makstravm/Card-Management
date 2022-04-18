import { createSelector } from "reselect";

import { RootStateType } from "store/store";

const getCardsList = (state: RootStateType) => state?.cards?.cardsList;

export const selectCardList = createSelector(
  getCardsList,
  (cardsList) => cardsList
);
