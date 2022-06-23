import { RootStore } from "store/index";

describe("store modals", () => {
  const { modal } = new RootStore();

  modal.hideModalAction();

  it("should be change  showModal to false", () => {
    modal.hideModalAction();
    expect(modal.showModal).toBe(false);
  });
});
