export type OptionsType = {
  id: string;
  value: string;
};

export type FieldStateType = {
  id?: number;
  name: string;
  type: string;
  required: boolean;
  options: OptionsType[] | [];
};
