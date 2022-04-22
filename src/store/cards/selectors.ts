import { createSelector } from "reselect";

import { RootStateType } from "store/store";

import { GroupOneCardsListsType } from "./types";

const getCardsList = (state: RootStateType) => state?.cards?.cardsList;

export const selectGroupCardsList = (par: string) =>
  createSelector(getCardsList, (cardsList) => {
    const groupCardsList = cardsList
      .map((val) => (par !== "All" ? `${val[par]}` : par))
      .reduce((acc: GroupOneCardsListsType, val, i) => {
        acc[val] = [...(acc?.[val] || []), cardsList[i]];

        return acc;
      }, {});

    return groupCardsList;
  });
