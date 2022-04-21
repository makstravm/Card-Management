import { createSelector } from "reselect";
import { CardType } from "store/cards/types";

import { RootStateType } from "store/store";

const getFieldsList = (state: RootStateType) => state?.fields?.fieldsList;

export const selectFieldsList = createSelector(
  getFieldsList,
  (fieldsList) => fieldsList
);

export const selectFieldsListAndInitValFormik = createSelector(
  getFieldsList,
  (fieldsList) => {
    const initialValues: Omit<CardType, "id"> = {};

    fieldsList?.forEach(({ type, name }) => {
      initialValues[name] = type !== "checkbox" ? "" : false;
    });

    return { fieldsList, initialValues };
  }
);

const getFieldTypes = (state: RootStateType) => state?.fields?.fieldTypes;

export const selectFieldTypes = createSelector(
  getFieldTypes,
  (fieldTypes) => fieldTypes
);
