import Cookies from "js-cookie";
import { makeAutoObservable, runInAction } from "mobx";
import { NavigateOptions, To } from "react-router-dom";

import { GET, POST } from "api/index";
import { Endpoints } from "constants/endpoints";
import { RoutesUrls } from "constants/routes";

import {
  LoginInitialValueType,
  RegistrationInitialValueType,
} from "helpers/types";
import { AuthResponseType, AuthUserType } from "./types";
import { RootStore } from "..";

const { LOGIN, REGISTER, USERS } = Endpoints;

const { BOARD } = RoutesUrls;

export class Authentication {
  user: AuthUserType | null = null;

  loading: boolean = false;

  error: string | null = null;

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  loginAction = async (
    value: LoginInitialValueType,
    navigate: (to: To, options?: NavigateOptions) => void
  ) => {
    this.loading = true;
    try {
      const {
        data: { user, accessToken },
      } = await POST<AuthResponseType, LoginInitialValueType>(LOGIN, value);

      Cookies.set("token", accessToken);
      runInAction(() => {
        this.user = user;
        this.loading = false;
      });
      navigate(BOARD, { replace: true });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
    }
  };

  registrationAction = async (
    value: RegistrationInitialValueType,
    navigate: () => void
  ) => {
    this.loading = true;
    try {
      await POST<AuthResponseType, RegistrationInitialValueType>(
        REGISTER,
        value
      );

      await this.loginAction(value, navigate);
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
    }
  };

  getDataUserAction = async (id: string) => {
    this.loading = true;
    try {
      const { data } = await GET(`${USERS}/${id}`);

      runInAction(() => {
        this.user = data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
    }
  };

  logOut() {
    Cookies.remove("token");
    this.user = null;
    this.loading = false;
    this.error = null;
  }
}
