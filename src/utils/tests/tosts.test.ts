import { toast } from "react-toastify";
import { notifyError, notifySuccess } from "utils/toast";

describe("toast", () => {
  it("should be to called toast error", () => {
    const toastError = jest.spyOn(toast, "error");

    notifyError("Error");
    expect(toastError).toHaveBeenCalledWith("Error", {
      position: "top-center",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  });

  it("should be to called toast success", () => {
    const toastError = jest.spyOn(toast, "success");

    notifySuccess("Success");
    expect(toastError).toHaveBeenCalledWith("Success", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  });
});
