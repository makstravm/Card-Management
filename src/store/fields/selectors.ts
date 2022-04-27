import { createSelector } from "reselect";
import { v1 } from "uuid";

import { TypesFields } from "constants/typesFields";

import { CardType } from "store/cards/types";

import { RootStateType } from "..";

const { TEXT } = TypesFields;

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

export const selectGroupOptions = createSelector(
  getFieldsList,
  (fieldsList) => [
    { id: v1(), value: "All" },
    ...fieldsList
      .filter((field) => field.type !== TEXT)
      .map((field) => ({ id: `${field.id}`, value: field.name })),
  ]
);

const getFieldTypes = (state: RootStateType) => state?.fields?.fieldTypes;

export const selectFieldTypes = createSelector(
  getFieldTypes,
  (fieldTypes) => fieldTypes
);
