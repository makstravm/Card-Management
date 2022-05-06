import { makeAutoObservable, runInAction } from "mobx";
import { v1 } from "uuid";

import { DELETE, GET, POST, PUT } from "api/index";
import { TypesFields } from "constants/typesFields";
import { Endpoints } from "constants/endpoints";

import { CardType } from "store/cards/types";

import { renameKeyObj } from "helpers/renameKeyObj";

import { notifySuccess } from "utils/toast";

import { FieldStateType, OptionsType } from "./types";
import { RootStore } from "..";

const { FIELDS, CARDS, FIELD_TYPES } = Endpoints;

const { CHECKBOX, TEXT, SELECT } = TypesFields;

export class Fields {
  fieldsList: FieldStateType[] | [] = [];

  fieldTypes: OptionsType[] | [] = [];

  loading: boolean = false;

  error: string | null = null;

  rootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  get groupOptions() {
    return [
      { id: v1(), value: "All" },
      ...this.fieldsList
        .filter(({ type }) => type !== TEXT)
        .map((field) => ({ id: `${field.id}`, value: field.name })),
    ];
  }

  get fieldsListAndInitValFormik() {
    const initialValues: Omit<CardType, "id"> = {};

    this.fieldsList?.forEach(({ type, name }) => {
      initialValues[name] = type !== "checkbox" ? "" : false;
    });

    return { fieldsList: this.fieldsList, initialValues };
  }

  saveFieldAction = async (values: FieldStateType) => {
    this.loading = true;
    try {
      const { data } = await POST<FieldStateType, FieldStateType>(
        FIELDS,
        values
      );

      const {
        cards: { cardsList, updateFieldsToCard },
        modal: { hideModalAction },
      } = this.rootStore;

      const newCardList = cardsList.map(async (card: CardType) => {
        const newCard = {
          ...card,
          [values.name]: values.type !== CHECKBOX ? "none" : false,
        };

        const { data } = await PUT<CardType, CardType>(
          `${CARDS}/${card.id}`,
          newCard
        );

        return data;
      });

      const result = await Promise.all(newCardList);

      notifySuccess("Field created");
      hideModalAction();

      updateFieldsToCard(result);
      runInAction(() => {
        this.fieldsList = [...this.fieldsList, data];
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
    }
  };

  editFieldAction = async (oldName: string, values: FieldStateType) => {
    this.loading = true;
    try {
      const { data: updatedField } = await PUT<FieldStateType, FieldStateType>(
        `${FIELDS}/${values.id}`,
        values
      );

      const {
        cards: { cardsList, updateFieldsToCard },
        modal: { hideModalAction },
      } = this.rootStore;

      const newCardList = cardsList.map(async (card: CardType) => {
        const newCard = renameKeyObj(card, oldName, values.name, card[oldName]);

        if (values.type === SELECT) {
          const checkedIsValueCard = updatedField.options.some(
            ({ value }) => value === card[oldName]
          );

          const aa = {
            ...newCard,
            [values.name]: checkedIsValueCard ? card[oldName] : "none",
          };

          const { data: updatedCard } = await PUT<
            CardType,
            Omit<CardType, "id">
          >(`${CARDS}/${card.id}`, aa);

          return updatedCard;
        }

        const { data: updatedCard } = await PUT<CardType, Omit<CardType, "id">>(
          `${CARDS}/${card.id}`,
          newCard
        );

        return updatedCard;
      });

      const result = await Promise.all(newCardList);

      notifySuccess("Field edited");
      hideModalAction();
      updateFieldsToCard(result);
      runInAction(() => {
        this.fieldsList = this.fieldsList.map((field) =>
          field.id === updatedField.id ? updatedField : field
        );
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
    }
  };

  getAllFieldAction = async () => {
    this.loading = true;
    try {
      const { data } = await GET(FIELDS);

      runInAction(() => {
        this.fieldsList = data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
    }
  };

  getFieldTypesAction = async () => {
    this.loading = true;
    try {
      const { data } = await GET(FIELD_TYPES);

      runInAction(() => {
        this.fieldTypes = data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
    }
  };

  deleteFieldAction = async (id: number, name: string) => {
    this.loading = true;
    try {
      await DELETE(`${FIELDS}/${id}`);
      const {
        cards: { cardsList, updateFieldsToCard },
      } = this.rootStore;

      runInAction(() => {
        this.fieldsList = this.fieldsList.filter(
          ({ id: fieldId }) => fieldId !== id
        );
        this.loading = false;
      });
      const newCardList = cardsList.map(async (card: CardType) => {
        delete card[name];

        const { data } = await PUT<CardType, CardType>(
          `${CARDS}/${card.id}`,
          card
        );

        return data;
      });

      const result = await Promise.all(newCardList);

      notifySuccess("Field deleted");
      updateFieldsToCard(result);
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
    }
  };

  deleteFieldOptionAction = async (
    id: number,
    field: FieldStateType,
    fieldValue: string,
    name: string
  ) => {
    this.loading = true;

    try {
      const { data } = await PUT<FieldStateType, FieldStateType>(
        `${FIELDS}/${id}`,
        field
      );

      const {
        cards: { cardsList, updateFieldsToCard },
      } = this.rootStore;

      const newCardList = cardsList.map(async (card: CardType) => {
        if (card[name] === fieldValue) {
          const { data } = await PUT<CardType, Omit<CardType, "id">>(
            `${CARDS}/${card.id}`,
            { ...card, [name]: "none" }
          );

          return data;
        }

        return card;
      });

      const result = await Promise.all(newCardList);

      runInAction(() => {
        this.fieldsList = this.fieldsList.map((field) =>
          field.id === data.id ? data : field
        );
        updateFieldsToCard(result);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
    }
  };
}
