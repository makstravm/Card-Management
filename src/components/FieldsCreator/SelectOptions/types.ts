export type SelectOptionsPropsType = {
  onSave: (data: string[]) => void;
  options: string[];
  changeOptions: (options: string[]) => void;
};
