import { createContext } from "react";
import { Authentication } from "./auth";
import { Cards } from "./cards";
import { Fields } from "./fields";
import { Modal } from "./modals";

export class RootStore {
  auth;

  modal;

  fields;

  cards;

  constructor() {
    this.auth = new Authentication(this);
    this.modal = new Modal(this);
    this.fields = new Fields(this);
    this.cards = new Cards(this);
  }
}

export const StoreContext = createContext<RootStore>(new RootStore());
