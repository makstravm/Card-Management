import { CardType } from "store/cards/types";

export type CardCreatorCheckboxPropsType = {
  name: string;
  card: CardType<boolean>;
  handleChangeCard: (card: CardType<boolean>) => void;
};
