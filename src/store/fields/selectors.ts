import { createSelector } from "reselect";

import { TypesFields } from "constants/typesFields";

import { CardType } from "store/cards/types";

import { RootStateType } from "store/store";

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
    { id: `All-0`, value: "All" },
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
