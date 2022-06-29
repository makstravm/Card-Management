import Cookies from "js-cookie";
import { RootStore } from "store/index";
import { axiosInstance } from "api/index";

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
      const response = {
        data: {
          email: "bob@b.b",
          password: "1q2w3e4r5t",
        },
      };

      jest.spyOn(axiosInstance, "get").mockResolvedValue(response);
      await auth.getDataUserAction("2");
      expect(auth.user).toEqual(response.data);
    });

    it("should receive data for error response", async () => {
      jest.spyOn(axiosInstance, "get").mockRejectedValue("Error");
      await auth.getDataUserAction("2");
      expect(auth.error).toEqual("Error");
    });
  });

  describe("log in", () => {
    it("should be  successful response for  log in", async () => {
      jest.spyOn(axiosInstance, "post").mockResolvedValue(response);
      await auth.loginAction({ email: "B@b.b", password: "1234" }, navigate);
      expect(Cookies.set).toBeCalledTimes(1);
      expect(auth.user).toEqual(response.data.user);
    });
    it("should be  error response for  log in", async () => {
      jest.spyOn(axiosInstance, "post").mockRejectedValue("Error");
      await auth.loginAction({ email: "B@b.b", password: "1234" }, navigate);
      expect(auth.error).toEqual("Error");
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

      await auth.registrationAction(registerValue, navigate);
      expect(auth.user).toEqual(response.data.user);
    });

    it("should be  error response for registration", async () => {
      jest.spyOn(axiosInstance, "post").mockRejectedValue("Error");

      await auth.registrationAction(registerValue, navigate);
      expect(auth.error).toEqual("Error");
    });
  });
});
