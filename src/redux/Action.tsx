export type AddNameACType = {
  type: "ADD-NAME";
  name: string;
};

export const addNameAC = (name: string): AddNameACType => ({
  type: "ADD-NAME",
  name,
});
