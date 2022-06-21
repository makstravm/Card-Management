import { renameKeyObj } from "helpers/renameKeyObj";

describe("rename key in the Object", () =>
  it("should be rename key in the object", () => {
    const card = { name: "Bob", id: 2, married: true };

    expect(renameKeyObj(card, "married", "car", "BMW")).toEqual({
      name: "Bob",
      id: 2,
      car: "BMW",
    });
  }));
