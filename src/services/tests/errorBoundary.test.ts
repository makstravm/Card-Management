import * as fn from "utils/toast";
import { errorBoundary } from "../errorBoundary";

jest.mock("utils/toast");
describe("errorBoudary", () => {
  it("should be show error when status 404", () => {
    const err = {
      status: 404,
      data: "Error",
      statusText: "Error StatusText",
    };

    errorBoundary(err);
    expect(fn.notifyError).toHaveBeenCalledWith("Error StatusText");
  });

  it("should be show error when status 404 without statusText", () => {
    const err = {
      status: 404,
      data: "Error",
      statusText: "",
    };

    errorBoundary(err);
    expect(fn.notifyError).toHaveBeenCalledWith("Network Error");
  });

  it("should be show error when status 400", () => {
    const err = {
      status: 400,
      data: "Error Data",
      statusText: "Error",
    };

    errorBoundary(err);
    expect(fn.notifyError).toHaveBeenCalledWith("Error Data");
  });

  it("should be show error when status 401", () => {
    const err = {
      status: 401,
      data: "Error Data",
      statusText: "Error",
    };

    errorBoundary(err);
    expect(fn.notifyError).toHaveBeenCalledWith("Error Data");
  });

  it("should be show error when any other status ", () => {
    const err = {
      status: 405,
      data: "Error Data",
      statusText: "Error",
    };

    errorBoundary(err);
    expect(fn.notifyError).toHaveBeenCalledWith("Error Data");
  });
});
