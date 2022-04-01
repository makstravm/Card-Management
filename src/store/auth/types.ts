export enum ActionTypes {
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
  error: string | null;
  loading: boolean;
};

export type AuthResponseType = {
  accessToken: string | null;
  user: AuthUserType | null;
};

export type LoginStartedType = {
  type: ActionTypes.LOGIN_STARTED;
};

export type LoginSuccessType = {
  type: ActionTypes.LOGIN_SUCCESS;
  payload: AuthUserType;
};

export type LoginFailureType = {
  type: ActionTypes.LOGIN_FAILURE;
  payload: string | null;
};

export type RegisterStartedType = {
  type: ActionTypes.REGISTER_STARTED;
};

export type RegisterSuccessType = {
  type: ActionTypes.REGISTER_SUCCESS;
};

export type RegisterFailureType = {
  type: ActionTypes.REGISTER_FAILURE;
  payload: string | null;
};

export type AuthReducerActionsTypes =
  | RegisterFailureType
  | RegisterSuccessType
  | RegisterStartedType
  | LoginFailureType
  | LoginSuccessType
  | LoginStartedType;
