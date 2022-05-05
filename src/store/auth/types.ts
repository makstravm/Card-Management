export type AuthUserType = {
  name: string;
  email: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  id: number;
};

export type AuthResponseType = {
  accessToken: string | null;
  user: AuthUserType | null;
};
