export type InitialState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};
