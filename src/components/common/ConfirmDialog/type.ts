export type ConfirmDialogType = {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleClick: () => void;
};
