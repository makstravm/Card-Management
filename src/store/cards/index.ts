import { makeAutoObservable, runInAction } from "mobx";

import { DELETE, GET, POST, PUT } from "api/index";
import { Endpoints } from "constants/endpoints";

import { CardType } from "store/cards/types";

import { notifySuccess } from "utils/toast";

import { CardsGroupByName } from "constants/cardsGroupByName";
import { RootStore } from "..";

const { CARDS } = Endpoints;

const { ALL } = CardsGroupByName;

export class Cards {
  cardsList: CardType[] = [];

  loading: boolean = false;

  error: string | null = null;

  rootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getGroupCardsList = (groupName: string) => {
    const groupCardsList: { [k: string]: CardType[] | [] } = {};

    if (groupName === ALL) {
      groupCardsList[groupName] = this.cardsList;
    } else {
      const { fieldsList } = this.rootStore.fields;

      const findField = fieldsList?.find(({ name }) => name === groupName);

      if (findField?.type === "checkbox") {
        groupCardsList.true = [];
        groupCardsList.false = [];
      }
      if (findField?.type === "select") {
        findField?.options?.forEach(({ value }) => {
          groupCardsList[value] = [];
        });
        groupCardsList.none = [];
      }
      if (Object.keys(groupCardsList).length) {
        this.cardsList?.forEach((element) => {
          const key = element[groupName].toString();

          groupCardsList[key] = [...groupCardsList[key], element];
        });
      }

      const sortGroupCardsList = Object.entries(groupCardsList).sort();

      return sortGroupCardsList;
    }

    return Object.entries(groupCardsList);
  };

  updateFieldsToCard = (updateCards: CardType[]) => {
    this.cardsList = updateCards;
  };

  saveCardAction = async (values: CardType | Omit<CardType, "id">) => {
    this.loading = true;
    try {
      const { hideModalAction } = this.rootStore.modal;

      const { data } = await POST<CardType, CardType | Omit<CardType, "id">>(
        CARDS,
        values
      );

      hideModalAction();
      notifySuccess("Card created");
      runInAction(() => {
        this.cardsList = [...this.cardsList, data];
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
    }
  };

  editCardAction = async (values: CardType | Omit<CardType, "id">) => {
    this.loading = true;
    try {
      const { hideModalAction } = this.rootStore.modal;

      const { data } = await PUT<CardType, CardType | Omit<CardType, "id">>(
        `${CARDS}/${values.id}`,
        values
      );

      hideModalAction();
      notifySuccess("Card edited");
      runInAction(() => {
        this.cardsList = this.cardsList.map((card) =>
          card.id === data.id ? data : card
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

  getAllCardsAction = async () => {
    this.loading = true;
    try {
      const { data } = await GET(CARDS);

      runInAction(() => {
        this.cardsList = data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
    }
  };

  deleteCardAction = async (id: CardType["id"]) => {
    this.loading = true;
    try {
      await DELETE<CardType>(`${CARDS}/${id}`);

      notifySuccess("Card deleted");
      runInAction(() => {
        this.cardsList = this.cardsList.filter((card) => card.id !== id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
    }
  };

  moveEditCardAction = async (id: number, key: string, value: string) => {
    this.loading = true;

    const card = this.cardsList.find((c) => c.id === id);

    try {
      const updatedCard = { ...card };

      if (value === "false" || value === "true") {
        updatedCard[key] = JSON.parse(value);
      } else {
        updatedCard[key] = value;
      }
      runInAction(() => {
        this.cardsList = this.cardsList.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        );
      });

      await PUT<CardType, CardType | Omit<CardType, "id">>(
        `${CARDS}/${id}`,
        updatedCard
      );

      notifySuccess("Card edited");
    } catch (error) {
      runInAction(() => {
        this.error = error;

        this.cardsList = this.cardsList.map((c) =>
          c.id === card.id ? card : c
        );
        this.loading = false;
      });
    }
  };
}
