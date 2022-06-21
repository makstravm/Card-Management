import * as fn from "utils/toast";
import { errorBoundary } from "../errorBoundary";

jest.mock("utils/toast");
describe("errorBoudary", () => {
  it("should be ", () => {
    const err = {
      status: 404,
      data: "Error",
      statusText: "Error",
    };

    errorBoundary(err);
    expect(fn.notifyError).toHaveBeenCalledWith("Error");
  });
});
