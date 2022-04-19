export const renameKeyObj = (
  oldKey: string,
  newKey: string,
  { [oldKey]: oldValue, ...others }
) => ({
  [newKey]: oldValue,
  ...others,
});
