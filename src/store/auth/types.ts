export type AuthUserType = {
  name: string;
  email: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  id: number;
};

export type InitialStateAuthType = {
  user: AuthUserType | null;
  loading: boolean;
  error: string | null;
};

export type AuthResponseType = {
  accessToken: string | null;
  user: AuthUserType | null;
};
