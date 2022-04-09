export type OptionPropsType = {
  value: string;
  optionsCount: number;
  onChange: (value: string) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
};
