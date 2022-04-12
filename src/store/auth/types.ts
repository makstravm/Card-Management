export enum AuthActionTypes {
  LOGIN_STARTED = "LOGIN_STARTED",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  REGISTER_STARTED = "REGISTER_STARTED",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAILURE = "REGISTER_FAILURE",
}

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
  data: AuthUserType | null;
};

export type LoginStartedType = {
  type: AuthActionTypes.LOGIN_STARTED;
};

export type LoginSuccessType = {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: AuthUserType;
};

export type LoginFailureType = {
  type: AuthActionTypes.LOGIN_FAILURE;
  payload: string | null;
};

export type RegisterStartedType = {
  type: AuthActionTypes.REGISTER_STARTED;
};

export type RegisterSuccessType = {
  type: AuthActionTypes.REGISTER_SUCCESS;
};

export type RegisterFailureType = {
  type: AuthActionTypes.REGISTER_FAILURE;
  payload: string | null;
};

export type AuthReducerActionsTypes =
  | RegisterFailureType
  | RegisterSuccessType
  | RegisterStartedType
  | LoginFailureType
  | LoginSuccessType
  | LoginStartedType;
