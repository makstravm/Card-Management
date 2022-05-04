import { ReactNode } from "react";
import { makeAutoObservable } from "mobx";
import { RootStore } from "..";

export class Modal {
  showModal: boolean = false;

  title: string = "";

  component: ReactNode | null = null;

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  showModalAction = (title: string, component: ReactNode) => {
    this.showModal = true;
    this.title = title;
    this.component = component;
  };

  hideModalAction = () => {
    this.showModal = false;
    this.title = "";
    this.component = null;
  };
}
