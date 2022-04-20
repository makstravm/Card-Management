import { CardType } from "store/cards/types";

export const renameKeyObj = (
  card: CardType,
  oldKey: string,
  newKey: string,
  newValue: string | boolean | number
) =>
  Object.fromEntries(
    Object.entries(card).map(([key, value]) =>
      key === oldKey ? [newKey, newValue] : [key, value]
    )
  );
