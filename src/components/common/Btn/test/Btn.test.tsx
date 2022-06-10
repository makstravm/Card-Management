import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Btn } from "components/common/Btn/Btn";

describe("component Btn", () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    render(
      <Btn
        title="Test"
        icon={<AddCircleIcon />}
        variantBtn="text"
        handleClick={handleClick}
      />
    );
  });

  it("should render the App component without crashing", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call the handleChange callback handler when using the userEvent", async () => {
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
