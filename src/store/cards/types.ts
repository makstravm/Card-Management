export type CardType = {
  id: number;
  [key: string]: string | boolean | number;
};

export type GroupOneCardsListsType = { [key: string]: CardType[] };
