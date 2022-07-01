import React from "react";
import { render, screen } from "@testing-library/react";
import { RootStore, StoreContext } from "store/index";
import userEvent from "@testing-library/user-event";
import { GroupCardsBtn } from "..";

const fieldsListRoot = [
  {
    name: "Position",
    type: "text",
    required: true,
    options: [],
    id: 2,
  },
  {
    name: "Department",
    type: "select",
    required: false,
    options: [
      {
        id: "0.5372611094649213",
        value: ".NET",
      },
      {
        id: "0.5692681653767555",
        value: " C++",
      },
    ],
    id: 3,
  },
  {
    name: "Car",
    type: "checkbox",
    required: false,
    options: [],
    id: 4,
  },
];

const root = new RootStore();

const { fields } = root;

const handleClick = jest.fn();

describe("GroupCardsBtn component", () => {
  beforeEach(() => {
    fields.fieldsList = fieldsListRoot;
    render(
      <StoreContext.Provider value={root}>
        <GroupCardsBtn title="All" handleChangeGroupBy={handleClick} />
      </StoreContext.Provider>
    );
  });

  it("should be render component", () => {
    expect(screen.getByRole("button", { name: /Car/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Department/i })
    ).toBeInTheDocument();
  });

  it("should be rendera component", async () => {
    expect(handleClick).toBeCalledTimes(0);
    await userEvent.click(screen.getByRole("button", { name: /Car/i }));
    expect(handleClick).toBeCalledWith("Car");
  });
});
