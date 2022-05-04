import { ReactNode } from "react";
import { makeAutoObservable } from "mobx";

export class Modal {
  showModal: boolean = false;

  title: string = "";

  component: ReactNode | null = null;

  constructor() {
    makeAutoObservable(this);
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

const modal = new Modal();

export default modal;
