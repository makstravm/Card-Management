import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { RootStore, StoreContext } from "store/index";
import { Board } from "components/Board";
import { Header } from "..";

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

  it("should be log out", async () => {
    await userEvent.click(screen.getByTestId("logout-btn"));
    expect(auth.user).toBeNull();
    expect(screen.queryByText(/bob/i)).not.toBeInTheDocument();
  });
});
