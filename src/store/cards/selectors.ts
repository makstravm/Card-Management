import { createSelector } from "reselect";

import { RootStateType } from "store/store";

import { GroupOneCardsListsType } from "./types";

const getCardsList = (state: RootStateType) => state?.cards?.cardsList;

export const selectGroupCardsList = (groupName: string) =>
  createSelector(getCardsList, (cardsList) => {
    const groupCardsList = cardsList
      .map((val) => (groupName !== "All" ? `${val[groupName]}` : groupName))
      .reduce((acc: GroupOneCardsListsType, val, i) => {
        acc[val] = [...(acc?.[val] || []), cardsList[i]];

        return acc;
      }, {});

    const sortGroupCardsList = Object.entries(groupCardsList).sort();

    return sortGroupCardsList;
  });
