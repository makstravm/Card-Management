import { cardsGroupByName } from "constants/cardsGroupByName";
import { createSelector } from "reselect";

import { RootStateType } from "..";

import { CardType } from "./types";

const { ALL } = cardsGroupByName;

const getCardsList = (state: RootStateType) => state?.cards?.cardsList;

const getFields = (state: RootStateType) => state?.fields?.fieldsList;

export const selectGroupCardsList = (groupName: string) =>
  createSelector(getCardsList, getFields, (cardsList, fieldsList) => {
    const groupCardsList: { [k: string]: CardType[] | [] } = {};

    if (groupName === ALL) {
      groupCardsList[groupName] = cardsList;
    } else {
      const findField = fieldsList?.find((field) => field?.name === groupName);

      if (findField?.type === "checkbox") {
        groupCardsList.true = [];
        groupCardsList.false = [];
      }
      if (findField?.type === "select") {
        findField?.options?.forEach(({ value }) => {
          groupCardsList[value] = [];
        });
      }
      if (Object.keys(groupCardsList).length) {
        cardsList?.forEach((element) => {
          const key = element[groupName].toString();

          groupCardsList[key] = [...groupCardsList[key], element];
        });
      }
      const sortGroupCardsList = Object.entries(groupCardsList).sort();

      return sortGroupCardsList;
    }

    return Object.entries(groupCardsList);
  });
