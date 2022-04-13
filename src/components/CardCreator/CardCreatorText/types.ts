import { CardType } from "store/cards/types";

export type CardCreatorTextPropsType = {
  name: string;
  required: boolean;
  card: CardType<string>;
  handleChangeCard: (card: CardType<string>) => void;
};
