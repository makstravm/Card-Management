import Cookies from "js-cookie";
import { RootStore } from "store/index";
import { axiosInstance } from "api/index";
import { waitFor } from "@testing-library/react";

const response = {
  data: {
    user: {
      email: "bob@b.b",

      password: "1q2w3e4r5t",
    },
    accessToken: "token",
  },
  status: 200,
  statusText: "Success",
  error: "",
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
    delete: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
  })),
}));

const { auth } = new RootStore();

jest.mock("js-cookie");

const navigate = jest.fn();

describe("auth", () => {
  it("should log out", () => {
    auth.logOut();
    expect(Cookies.remove).toHaveBeenCalledWith("token");
    expect(auth.user).toBe(null);
  });

  describe("get data user", () => {
    it("should receive data for successful response", async () => {
      jest.spyOn(axiosInstance, "get").mockResolvedValue(response);

      auth.getDataUserAction("2");

      waitFor(() => {
        expect(auth.user).toEqual(response.data.user);
      });
    });

    it("should receive data for error response", async () => {
      jest.spyOn(axiosInstance, "get").mockRejectedValue(TypeError);
      auth.getDataUserAction("2");
      waitFor(() => {
        expect(auth.error).toEqual(TypeError);
      });
    });
  });

  describe("log in", () => {
    it("should be  successful response for  log in", async () => {
      jest.spyOn(axiosInstance, "post").mockResolvedValue(response);

      auth.loginAction({ email: "B@b.b", password: "1234" }, navigate);

      waitFor(() => {
        expect(Cookies.set).toBeCalledTimes(1);
        expect(auth.user).toEqual(response.data.user);
      });
    });

    it("should be  error response for  log in", async () => {
      jest.spyOn(axiosInstance, "post").mockRejectedValue(TypeError);

      auth.loginAction({ email: "B@b.b", password: "1234" }, navigate);
      waitFor(() => {
        expect(auth.error).toEqual(TypeError);
      });
    });
  });

  describe("registrations", () => {
    const registerValue = {
      email: "bob@b.b",
      password: "1q2w3e4r5t",
      confirmPassword: "1q2w3e4r5t",
      lastName: "BobLast",
      name: "bob",
    };

    it("should be  successful response for registration", async () => {
      jest.spyOn(axiosInstance, "post").mockResolvedValue(response);

      auth.registrationAction(registerValue, navigate);

      waitFor(() => {
        expect(Cookies.set).toBeCalledTimes(1);
        expect(auth.user).toEqual(response.data.user);
      });
    });

    it("should be  error response for registration", async () => {
      jest.spyOn(axiosInstance, "post").mockRejectedValue(TypeError);

      auth.registrationAction(registerValue, navigate);
      waitFor(() => {
        expect(auth.error).toEqual(TypeError);
      });
    });
  });
});
