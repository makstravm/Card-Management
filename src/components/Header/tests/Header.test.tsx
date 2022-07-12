import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { FieldStateType } from "store/fields/types";
import userEvent from "@testing-library/user-event";
import { RootStore, StoreContext } from "store/index";
import { axiosInstance } from "api/index";
import { Board } from "components/Board";
import { Header } from "..";

const responseFieldList: { data: FieldStateType[] } = {
  data: [
    {
      name: "Name",
      type: "text",
      required: true,
      options: [],
      id: 1,
    },
  ],
};

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn(),
      },
      response: {
        use: jest.fn(),
        eject: jest.fn(),
      },
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  })),
}));

jest.spyOn(axiosInstance, "get").mockResolvedValue(responseFieldList);

const root = new RootStore();

const { auth } = root;

auth.user = {
  name: "Bob",
  email: "bob@b.b",
  lastName: "Bob Last",
  password: "1q2w3e4r",
  confirmPassword: "1q2w3e4r",
  id: 4,
};
describe("Header", () => {
  beforeEach(() => {
    render(
      <StoreContext.Provider value={root}>
        <MemoryRouter initialEntries={["/"]}>
          <Header />
          <Routes>
            <Route path="/" element={<Board />} />
          </Routes>
        </MemoryRouter>
      </StoreContext.Provider>
    );
  });

  it("should be rendered with user name", () => {
    expect(screen.queryByText(/bob/i)).toBeInTheDocument();
  });

  it("should", async () => {
    await userEvent.click(screen.getByTestId("logout-btn"));
    expect(auth.user).toBeNull();
    expect(screen.queryByText(/bob/i)).not.toBeInTheDocument();
  });
});
