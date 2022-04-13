import { OptionsType } from "store/fields/types";
import { CardType } from "store/cards/types";

export type CardCreatorSelectPropsType = {
  name: string;
  options: OptionsType[];
  card: CardType<string>;
  handleChangeCard: (card: CardType<string>) => void;
};
