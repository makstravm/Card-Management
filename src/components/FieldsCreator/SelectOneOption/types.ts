export type OptionPropsType = {
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
};
